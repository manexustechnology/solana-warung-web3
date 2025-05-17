
import React from 'react';
import { Search, Barcode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onScanBarcode: () => void;
}

const SearchBar = ({ searchTerm, onSearchChange, onScanBarcode }: SearchBarProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" onClick={onScanBarcode}>
        <Barcode className="h-4 w-4 mr-2" />
        <span className="hidden md:inline">Scan Barcode</span>
      </Button>
    </div>
  );
};

export default SearchBar;
