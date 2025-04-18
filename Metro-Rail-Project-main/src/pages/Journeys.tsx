import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-hot-toast";
import { MapPin, CalendarIcon, Filter, Download, Clock, CheckCircle, XCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

// Types
interface Journey {
  id: string;
  date: string;
  startStation: string;
  endStation: string;
  status: "completed" | "cancelled" | "in-progress";
  fare: number;
  paymentMethod: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "successful" | "failed" | "pending";
  journey?: string;
}

const Journeys: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("journeys");
  const [isLoading, setIsLoading] = useState(true);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userDataStr = localStorage.getItem("user");
    
    if (!token || !userDataStr) {
      toast.error("Please login to view your journeys");
      navigate("/login");
      return;
    }

    try {
      const parsedUserData = JSON.parse(userDataStr);
      setUserData(parsedUserData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("Error loading user data");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch journeys and payments
  useEffect(() => {
    if (!userData) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from API first
        const token = localStorage.getItem('token');
        
        if (token) {
          try {
            // Try fetching journeys data from API
            const journeyResponse = await fetch('http://localhost:8000/api/journeys/', {
              headers: {
                'Authorization': `Token ${token}`
              }
            });
            
            // If successful, use that data
            if (journeyResponse.ok) {
              const journeyData = await journeyResponse.json();
              setJourneys(journeyData.map((item: any) => ({
                id: item.id.toString(),
                date: item.date || new Date().toISOString(),
                startStation: item.start_station || "Unknown",
                endStation: item.end_station || "Unknown",
                status: item.status || "completed",
                fare: item.fare || 0,
                paymentMethod: item.payment_method || "card"
              })));
              
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.error('API error, falling back to mock data:', error);
          }
        }
        
        // Fall back to mock data if API fails
        setTimeout(() => {
          const mockJourneys: Journey[] = [
            {
              id: "j1",
              date: "2023-10-01T09:30:00",
              startStation: "Uttara North",
              endStation: "Motijheel",
              status: "completed",
              fare: 60,
              paymentMethod: "card",
            },
            {
              id: "j2",
              date: "2023-10-05T18:15:00",
              startStation: "Agargaon",
              endStation: "Uttara Center",
              status: "completed",
              fare: 40,
              paymentMethod: "mobile",
            },
            {
              id: "j3",
              date: "2023-10-10T12:00:00",
              startStation: "Mirpur 10",
              endStation: "Farmgate",
              status: "cancelled",
              fare: 30,
              paymentMethod: "card",
            },
            {
              id: "j4",
              date: "2023-10-15T08:45:00",
              startStation: "Uttara Center",
              endStation: "Shahbagh",
              status: "completed",
              fare: 50,
              paymentMethod: "card",
            },
            {
              id: "j5",
              date: "2023-10-20T17:30:00",
              startStation: "Motijheel",
              endStation: "Uttara North",
              status: "in-progress",
              fare: 60,
              paymentMethod: "mobile",
            },
          ];

          const mockPayments: Payment[] = [
            {
              id: "p1",
              date: "2023-10-01T09:25:00",
              amount: 60,
              method: "card",
              status: "successful",
              journey: "j1",
            },
            {
              id: "p2",
              date: "2023-10-05T18:10:00",
              amount: 40,
              method: "mobile",
              status: "successful",
              journey: "j2",
            },
            {
              id: "p3",
              date: "2023-10-10T11:55:00",
              amount: 30,
              method: "card",
              status: "failed",
              journey: "j3",
            },
            {
              id: "p4",
              date: "2023-10-15T08:40:00",
              amount: 50,
              method: "card",
              status: "successful",
              journey: "j4",
            },
            {
              id: "p5",
              date: "2023-10-20T17:25:00",
              amount: 60,
              method: "mobile",
              status: "pending",
              journey: "j5",
            },
            {
              id: "p6",
              date: "2023-10-25T10:00:00",
              amount: 500,
              method: "mobile",
              status: "successful",
            },
          ];

          setJourneys(mockJourneys);
          setPayments(mockPayments);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load your data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  // Filter journeys based on search term and status
  const filteredJourneys = journeys.filter((journey) => {
    const matchesSearch =
      journey.startStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.endStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || journey.status === statusFilter;

    const journeyDate = new Date(journey.date);
    const matchesDateRange =
      (!startDate || journeyDate >= startDate) &&
      (!endDate || journeyDate <= endDate);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;

    const paymentDate = new Date(payment.date);
    const matchesDateRange =
      (!startDate || paymentDate >= startDate) &&
      (!endDate || paymentDate <= endDate);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "successful":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      case "cancelled":
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      case "in-progress":
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            <Clock className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP p");
  };

  // Export to CSV
  const exportToCSV = (data: any[], type: string) => {
    let csvContent = "";
    
    // Headers
    if (type === "journeys") {
      csvContent = "ID,Date,From,To,Status,Fare,Payment Method\n";
      data.forEach(journey => {
        csvContent += `${journey.id},${journey.date},${journey.startStation},${journey.endStation},${journey.status},${journey.fare},${journey.paymentMethod}\n`;
      });
    } else {
      csvContent = "ID,Date,Amount,Method,Status,Journey ID\n";
      data.forEach(payment => {
        csvContent += `${payment.id},${payment.date},${payment.amount},${payment.method},${payment.status},${payment.journey || "-"}\n`;
      });
    }
    
    // Create a download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${type}-${new Date().toISOString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Loading your data...</CardTitle>
            <CardDescription>Please wait while we retrieve your journeys and payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout isLoggedIn={true}>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Travel History</CardTitle>
            <CardDescription>
              View and manage your journey and payment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="journeys"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="journeys">Journeys</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="journeys">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search journeys by station or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-[180px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate && endDate
                              ? `${format(startDate, "PPP")} - ${format(endDate, "PPP")}`
                              : "Filter by date range"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            selected={{
                              from: startDate,
                              to: endDate,
                            }}
                            onSelect={(range) => {
                              setStartDate(range?.from);
                              setEndDate(range?.to);
                            }}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>

                      <Button
                        variant="outline"
                        onClick={() => exportToCSV(filteredJourneys, "journeys")}
                        disabled={filteredJourneys.length === 0}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>

                  {filteredJourneys.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No journeys found matching your criteria</p>
                    </div>
                  ) : (
                    <Table>
                      <TableCaption>
                        {filteredJourneys.length} journeys found
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Fare</TableHead>
                          <TableHead>Payment</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredJourneys.map((journey) => (
                          <TableRow key={journey.id}>
                            <TableCell>{formatDate(journey.date)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-primary" />
                                {journey.startStation}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-secondary" />
                                {journey.endStation}
                              </div>
                            </TableCell>
                            <TableCell>{renderStatusBadge(journey.status)}</TableCell>
                            <TableCell className="text-right font-medium">
                              {journey.fare} Tk
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {journey.paymentMethod === "card" ? "Card" : "Mobile Banking"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="payments">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search payments by ID or method..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-[180px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="successful">Successful</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate && endDate
                              ? `${format(startDate, "PPP")} - ${format(endDate, "PPP")}`
                              : "Filter by date range"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            selected={{
                              from: startDate,
                              to: endDate,
                            }}
                            onSelect={(range) => {
                              setStartDate(range?.from);
                              setEndDate(range?.to);
                            }}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>

                      <Button
                        variant="outline"
                        onClick={() => exportToCSV(filteredPayments, "payments")}
                        disabled={filteredPayments.length === 0}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>

                  {filteredPayments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No payments found matching your criteria</p>
                    </div>
                  ) : (
                    <Table>
                      <TableCaption>
                        {filteredPayments.length} payments found
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Payment ID</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Journey</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>{payment.id}</TableCell>
                            <TableCell className="font-medium">
                              {payment.amount} Tk
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {payment.method === "card" ? "Card" : "Mobile Banking"}
                              </Badge>
                            </TableCell>
                            <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                            <TableCell>
                              {payment.journey ? payment.journey : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Journeys;
