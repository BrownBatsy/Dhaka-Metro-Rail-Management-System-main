import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { CalendarIcon, Filter, Download, Loader2, ChevronRight, MoreHorizontal, CheckCircle, XCircle, Clock, MapPin, Plus } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
interface Journey {
  id: string;
  date: string;
  userId: string;
  userName: string;
  startStation: string;
  endStation: string;
  status: "completed" | "cancelled" | "in-progress";
  fare: number;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed";
}

const AdminJourneys: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Check if user is logged in and is admin
  useEffect(() => {
    const userDataStr = localStorage.getItem("user");
    if (!userDataStr) {
      toast.error("Please login to access admin panel");
      navigate("/login");
      return;
    }

    try {
      const parsedUserData = JSON.parse(userDataStr);
      setUserData(parsedUserData);
      
      // Check if user is admin
      if (!parsedUserData.isAdmin) {
        toast.error("You do not have permission to access the admin panel");
        navigate("/dashboard");
        return;
      }
      
      setIsAdmin(true);
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("Error loading user data");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all journeys
  useEffect(() => {
    if (!userData || !isAdmin) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data for demo
        // In a real app, this would be an API call to fetch all journeys
        // await fetch("/api/admin/journeys")
        setTimeout(() => {
          const mockJourneys: Journey[] = [
            {
              id: "j1",
              date: "2023-10-01T09:30:00",
              userId: "u1",
              userName: "Rahim Ahmed",
              startStation: "Uttara North",
              endStation: "Motijheel",
              status: "completed",
              fare: 60,
              paymentMethod: "card",
              paymentStatus: "paid",
            },
            {
              id: "j2",
              date: "2023-10-05T18:15:00",
              userId: "u2",
              userName: "Karim Hassan",
              startStation: "Agargaon",
              endStation: "Uttara Center",
              status: "completed",
              fare: 40,
              paymentMethod: "mobile",
              paymentStatus: "paid",
            },
            {
              id: "j3",
              date: "2023-10-10T12:00:00",
              userId: "u3",
              userName: "Fatima Begum",
              startStation: "Mirpur 10",
              endStation: "Farmgate",
              status: "cancelled",
              fare: 30,
              paymentMethod: "card",
              paymentStatus: "failed",
            },
            {
              id: "j4",
              date: "2023-10-15T08:45:00",
              userId: "u1",
              userName: "Rahim Ahmed",
              startStation: "Uttara Center",
              endStation: "Shahbagh",
              status: "completed",
              fare: 50,
              paymentMethod: "card",
              paymentStatus: "paid",
            },
            {
              id: "j5",
              date: "2023-10-20T17:30:00",
              userId: "u4",
              userName: "Sofia Rahman",
              startStation: "Motijheel",
              endStation: "Uttara North",
              status: "in-progress",
              fare: 60,
              paymentMethod: "mobile",
              paymentStatus: "pending",
            },
            {
              id: "j6",
              date: "2023-10-22T10:15:00",
              userId: "u5",
              userName: "Abdullah Khan",
              startStation: "Pallabi",
              endStation: "Agargaon",
              status: "completed",
              fare: 35,
              paymentMethod: "mobile",
              paymentStatus: "paid",
            },
            {
              id: "j7",
              date: "2023-10-23T14:30:00",
              userId: "u2",
              userName: "Karim Hassan",
              startStation: "Farmgate",
              endStation: "Motijheel",
              status: "in-progress",
              fare: 45,
              paymentMethod: "card",
              paymentStatus: "paid",
            },
          ];

          setJourneys(mockJourneys);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching journey data:", error);
        toast.error("Failed to load journey data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData, isAdmin, navigate]);

  // Filter journeys based on search term, status, and date range
  const filteredJourneys = journeys.filter((journey) => {
    const matchesSearch =
      journey.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.startStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.endStation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || journey.status === statusFilter;

    const matchesPaymentStatus =
      paymentStatusFilter === "all" || journey.paymentStatus === paymentStatusFilter;

    const journeyDate = new Date(journey.date);
    const matchesDateRange =
      (!startDate || journeyDate >= startDate) &&
      (!endDate || journeyDate <= endDate);

    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDateRange;
  });

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
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

  // Handle journey status change
  const handleStatusChange = (journeyId: string, newStatus: string) => {
    setJourneys(journeys.map(journey => 
      journey.id === journeyId ? {...journey, status: newStatus as any} : journey
    ));
    toast.success(`Journey status updated to ${newStatus}`);
  };

  // Handle payment status change
  const handlePaymentStatusChange = (journeyId: string, newStatus: string) => {
    setJourneys(journeys.map(journey => 
      journey.id === journeyId ? {...journey, paymentStatus: newStatus as any} : journey
    ));
    toast.success(`Payment status updated to ${newStatus}`);
  };

  // Export to CSV
  const exportToCSV = (data: any[]) => {
    let csvContent = "ID,Date,User ID,User Name,From,To,Status,Fare,Payment Method,Payment Status\n";
    
    data.forEach(journey => {
      csvContent += `${journey.id},${journey.date},${journey.userId},${journey.userName},${journey.startStation},${journey.endStation},${journey.status},${journey.fare},${journey.paymentMethod},${journey.paymentStatus}\n`;
    });
    
    // Create a download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `journeys-export-${new Date().toISOString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View journey details
  const viewJourneyDetails = (journey: Journey) => {
    setSelectedJourney(journey);
    setIsDialogOpen(true);
  };

  // Add new journey
  const handleAddJourney = (journeyData: any) => {
    const newJourney: Journey = {
      id: `j${journeys.length + 1}`,
      date: journeyData.date.toISOString(),
      userId: journeyData.userId,
      userName: journeyData.userName,
      startStation: journeyData.startStation,
      endStation: journeyData.endStation,
      status: journeyData.status,
      fare: parseFloat(journeyData.fare),
      paymentMethod: journeyData.paymentMethod,
      paymentStatus: journeyData.paymentStatus,
    };

    setJourneys([newJourney, ...journeys]);
    toast.success("Journey record created successfully");
    setIsCreateDialogOpen(false);
  };

  // Form schema for creating a new journey
  const formSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    userName: z.string().min(1, "User name is required"),
    date: z.date(),
    startStation: z.string().min(1, "Start station is required"),
    endStation: z.string().min(1, "End station is required"),
    status: z.enum(["completed", "cancelled", "in-progress"]),
    fare: z.string().min(1, "Fare is required"),
    paymentMethod: z.enum(["card", "mobile"]),
    paymentStatus: z.enum(["paid", "pending", "failed"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      userName: "",
      date: new Date(),
      startStation: "",
      endStation: "",
      status: "in-progress",
      fare: "",
      paymentMethod: "card",
      paymentStatus: "pending",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleAddJourney(values);
  }

  // Loading state
  if (isLoading) {
    return (
      <Layout isLoggedIn={true}>
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              <CardDescription>Loading journey data...</CardDescription>
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
      </Layout>
    );
  }

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header with Title and Create Button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Journey Management</h1>
            <p className="mt-2 text-gray-600">View and manage all user journeys and payments</p>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 sm:self-start"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Journey
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="border-b">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <CardTitle>Journey Records</CardTitle>
                <CardDescription>
                  Filter and search through all journey records
                </CardDescription>
              </div>
              <Button 
                variant="outline"
                onClick={() => exportToCSV(filteredJourneys)}
                disabled={filteredJourneys.length === 0}
                className="sm:self-start"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col space-y-6">
              {/* Search Input */}
              <div className="w-full">
                <Input
                  placeholder="Search by user, station or journey ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Journey Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={paymentStatusFilter}
                  onValueChange={setPaymentStatusFilter}
                >
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
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
                      <TableHead>User</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Journey Status</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead className="text-right">Fare</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJourneys.map((journey) => (
                      <TableRow key={journey.id}>
                        <TableCell>{formatDate(journey.date)}</TableCell>
                        <TableCell>{journey.userName}</TableCell>
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
                        <TableCell>{renderStatusBadge(journey.paymentStatus)}</TableCell>
                        <TableCell className="text-right font-medium">
                          {journey.fare} Tk
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => viewJourneyDetails(journey)}>
                                <ChevronRight className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Journey Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleStatusChange(journey.id, "completed")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Mark Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(journey.id, "in-progress")}>
                                <Clock className="h-4 w-4 mr-2 text-amber-500" />
                                Mark In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(journey.id, "cancelled")}>
                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                Mark Cancelled
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handlePaymentStatusChange(journey.id, "paid")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Mark Paid
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePaymentStatusChange(journey.id, "pending")}>
                                <Clock className="h-4 w-4 mr-2 text-amber-500" />
                                Mark Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePaymentStatusChange(journey.id, "failed")}>
                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                Mark Failed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journey Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Journey Details</DialogTitle>
            <DialogDescription>
              Detailed information about journey {selectedJourney?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedJourney && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Journey ID</p>
                <p className="text-sm text-gray-500">{selectedJourney.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-gray-500">{formatDate(selectedJourney.date)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">User ID</p>
                <p className="text-sm text-gray-500">{selectedJourney.userId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">User Name</p>
                <p className="text-sm text-gray-500">{selectedJourney.userName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">From Station</p>
                <p className="text-sm text-gray-500">{selectedJourney.startStation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">To Station</p>
                <p className="text-sm text-gray-500">{selectedJourney.endStation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Journey Status</p>
                <div>{renderStatusBadge(selectedJourney.status)}</div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Payment Status</p>
                <div>{renderStatusBadge(selectedJourney.paymentStatus)}</div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Fare</p>
                <p className="text-sm text-gray-500">{selectedJourney.fare} Tk</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-gray-500">{selectedJourney.paymentMethod === "card" ? "Card" : "Mobile Banking"}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Journey Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Journey</DialogTitle>
            <DialogDescription>
              Add a new journey record to the system.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., u123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date & Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP p")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fare"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fare (Tk)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="startStation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Station</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select start station" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Uttara North">Uttara North</SelectItem>
                          <SelectItem value="Uttara Center">Uttara Center</SelectItem>
                          <SelectItem value="Uttara South">Uttara South</SelectItem>
                          <SelectItem value="Pallabi">Pallabi</SelectItem>
                          <SelectItem value="Mirpur 10">Mirpur 10</SelectItem>
                          <SelectItem value="Agargaon">Agargaon</SelectItem>
                          <SelectItem value="Farmgate">Farmgate</SelectItem>
                          <SelectItem value="Shahbagh">Shahbagh</SelectItem>
                          <SelectItem value="Motijheel">Motijheel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endStation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Station</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select end station" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Uttara North">Uttara North</SelectItem>
                          <SelectItem value="Uttara Center">Uttara Center</SelectItem>
                          <SelectItem value="Uttara South">Uttara South</SelectItem>
                          <SelectItem value="Pallabi">Pallabi</SelectItem>
                          <SelectItem value="Mirpur 10">Mirpur 10</SelectItem>
                          <SelectItem value="Agargaon">Agargaon</SelectItem>
                          <SelectItem value="Farmgate">Farmgate</SelectItem>
                          <SelectItem value="Shahbagh">Shahbagh</SelectItem>
                          <SelectItem value="Motijheel">Motijheel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Journey Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="mobile">Mobile Banking</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Journey</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminJourneys; 