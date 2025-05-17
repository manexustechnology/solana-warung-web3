
import React, { useState } from 'react';
import SellerLayout from '@/components/layout/SellerLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Calendar, Download, FileText, Filter, MoreHorizontal, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample reports data
const salesReports = [
  { id: 'RPT-001', name: 'Monthly Sales Summary', date: '2023-04-01', type: 'sales', format: 'PDF' },
  { id: 'RPT-002', name: 'Quarterly Revenue Report', date: '2023-04-15', type: 'revenue', format: 'EXCEL' },
  { id: 'RPT-003', name: 'Product Performance', date: '2023-04-20', type: 'product', format: 'PDF' },
  { id: 'RPT-004', name: 'Customer Acquisition', date: '2023-04-22', type: 'customer', format: 'CSV' },
  { id: 'RPT-005', name: 'Inventory Status', date: '2023-04-25', type: 'inventory', format: 'EXCEL' },
  { id: 'RPT-006', name: 'Tax Summary', date: '2023-04-28', type: 'financial', format: 'PDF' },
];

const recentActivity = [
  { action: 'Generated Sales Report', date: '2023-04-28', user: 'Admin' },
  { action: 'Downloaded Inventory Report', date: '2023-04-25', user: 'Admin' },
  { action: 'Scheduled Weekly Sales Report', date: '2023-04-24', user: 'Admin' },
  { action: 'Modified Customer Report Template', date: '2023-04-22', user: 'Admin' },
  { action: 'Generated Tax Report', date: '2023-04-20', user: 'Admin' },
];

const scheduledReports = [
  { name: 'Weekly Sales Summary', frequency: 'Weekly', nextRun: '2023-05-01', format: 'PDF' },
  { name: 'Monthly Inventory Status', frequency: 'Monthly', nextRun: '2023-05-01', format: 'EXCEL' },
  { name: 'Customer Activity', frequency: 'Daily', nextRun: '2023-04-29', format: 'CSV' },
];

const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Report Downloaded",
      description: `Report ${reportId} has been downloaded.`,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be available shortly.",
    });
  };

  const filteredReports = salesReports.filter(
    (report) => 
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SellerLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Generate and manage business reports</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </div>
        </div>

        <Tabs defaultValue="all-reports" className="space-y-6">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="all-reports">All Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all-reports" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search reports..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.name}</TableCell>
                          <TableCell className="capitalize">{report.type}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>{report.format}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDownloadReport(report.id)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest report-related actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">By {activity.user}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Reports</CardTitle>
                  <CardDescription>Generate commonly used reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Daily Sales Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Inventory Status
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Top Selling Products
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Customer Activity
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Tax Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Reports that run automatically on a schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Next Run</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduledReports.map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{report.frequency}</TableCell>
                          <TableCell>{report.nextRun}</TableCell>
                          <TableCell>{report.format}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  Edit Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Run Now
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Pause
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>
                    Schedule New Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Customize and manage report templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Sales Summary', 'Inventory', 'Customer Analysis', 'Product Performance', 'Financial', 'Custom Report'].map((template, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-40">
                        <FileText className="h-10 w-10 mb-2 text-muted-foreground" />
                        <p className="font-medium">{template}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to edit or use</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>
                    Create New Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  );
};

export default ReportsPage;
