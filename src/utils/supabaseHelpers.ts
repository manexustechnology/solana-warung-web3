
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Define the table names as a union of string literals
// These must match exactly what's in the Supabase schema
type TableName = 'store_users' | 'products' | 'orders' | 'order_items' | 'profiles' | 'carts' | 'cart_items';

// For flexible table access (including ones that might not be in the schema yet)
type AnyTable = TableName | string;

/**
 * Generic function to fetch data from Supabase with fallback to demo data
 * @param tableName The Supabase table to fetch data from
 * @param demoData The demo data to return if Supabase connection fails
 * @param queryOptions Additional query options (select, order, filter, etc.)
 */
export async function fetchWithFallback<T>(
  tableName: AnyTable, 
  demoData: T[],
  queryOptions?: {
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    filters?: { column: string; value: any; operator?: string }[];
  }
): Promise<{ data: T[]; isDemo: boolean }> {
  try {
    // Use type assertion to any to bypass type checking temporarily
    let query = supabase.from(tableName as any).select(queryOptions?.select || '*');
    
    // Apply filters if any
    if (queryOptions?.filters) {
      queryOptions.filters.forEach(filter => {
        const operator = filter.operator || 'eq';
        if (operator === 'eq') {
          query = query.eq(filter.column, filter.value);
        } else if (operator === 'gt') {
          query = query.gt(filter.column, filter.value);
        } else if (operator === 'lt') {
          query = query.lt(filter.column, filter.value);
        } else if (operator === 'gte') {
          query = query.gte(filter.column, filter.value);
        } else if (operator === 'lte') {
          query = query.lte(filter.column, filter.value);
        } else if (operator === 'like') {
          query = query.like(filter.column, filter.value);
        }
      });
    }
    
    // Apply ordering if specified
    if (queryOptions?.orderBy) {
      query = query.order(queryOptions.orderBy.column, { 
        ascending: queryOptions.orderBy.ascending ?? true 
      });
    }
    
    // Apply limit if specified
    if (queryOptions?.limit) {
      query = query.limit(queryOptions.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error fetching from ${tableName}:`, error);
      toast({
        title: "Database Connection Issue",
        description: "Currently displaying demo data",
        variant: "destructive",
      });
      return { data: demoData, isDemo: true };
    }
    
    return { data: data as T[], isDemo: false };
  } catch (error) {
    console.error(`Failed to fetch from ${tableName}:`, error);
    toast({
      title: "Database Connection Issue",
      description: "Currently displaying demo data",
      variant: "destructive",
    });
    return { data: demoData, isDemo: true };
  }
}

/**
 * Generic function to submit data to Supabase with fallback
 * @param tableName The Supabase table to insert data to
 * @param data The data to insert
 * @param onSuccess Callback function to execute on successful insertion
 * @param fallbackAction Action to perform when Supabase connection fails
 */
export async function submitWithFallback<T>(
  tableName: AnyTable,
  data: T,
  onSuccess?: (data: T) => void,
  fallbackAction?: () => void
): Promise<{ success: boolean; isDemo: boolean; data?: T; error?: string }> {
  try {
    // Use type assertion to any to bypass type checking
    const { data: insertedData, error } = await supabase
      .from(tableName as any)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      toast({
        title: "Database Connection Issue",
        description: "Operating in demo mode - changes won't be saved",
        variant: "destructive",
      });
      
      if (fallbackAction) {
        fallbackAction();
      }
      
      return { success: false, isDemo: true, error: error.message };
    }
    
    if (onSuccess && insertedData) {
      onSuccess(insertedData as T);
    }
    
    return { success: true, isDemo: false, data: insertedData as T };
  } catch (error: any) {
    console.error(`Failed to insert into ${tableName}:`, error);
    toast({
      title: "Database Connection Issue",
      description: "Operating in demo mode - changes won't be saved",
      variant: "destructive",
    });
    
    if (fallbackAction) {
      fallbackAction();
    }
    
    return { success: false, isDemo: true, error: error?.message || 'Unknown error' };
  }
}
