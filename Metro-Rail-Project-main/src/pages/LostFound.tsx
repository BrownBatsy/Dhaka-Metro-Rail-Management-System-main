
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, MapPin, Clock, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample lost items data
const lostItemsData = [
  {
    id: "L001",
    title: "Black Leather Wallet",
    description: "Leather wallet with ID card and bank cards",
    location: "Uttara North Station",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2787&auto=format&fit=crop",
    status: "unclaimed",
    date: "2025-04-10",
  },
  {
    id: "L002",
    title: "Blue Smartphone",
    description: "Samsung Galaxy S22 with cracked screen",
    location: "Agargaon Station",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2727&auto=format&fit=crop",
    status: "unclaimed",
    date: "2025-04-08",
  },
  {
    id: "L003",
    title: "Red Backpack",
    description: "Adidas backpack with textbooks inside",
    location: "Motijheel Station",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2787&auto=format&fit=crop",
    status: "unclaimed",
    date: "2025-04-05",
  },
  {
    id: "L004",
    title: "Prescription Glasses",
    description: "Black frame glasses in brown case",
    location: "Farmgate Station",
    imageUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=2787&auto=format&fit=crop",
    status: "unclaimed",
    date: "2025-04-01",
  },
];

const LostFoundItem = ({ item }: { item: typeof lostItemsData[0] }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{item.date}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{item.description}</p>
        <Button 
          variant="outline"
          className="w-full"
          onClick={() => setShowDetails(!showDetails)}
        >
          View Details
        </Button>
      </CardContent>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
            <DialogDescription>Lost item details</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="h-56 overflow-hidden rounded-lg">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500">Location Found</Label>
                <p className="font-medium">{item.location}</p>
              </div>
              <div>
                <Label className="text-gray-500">Date Found</Label>
                <p className="font-medium">{item.date}</p>
              </div>
            </div>
            
            <div>
              <Label className="text-gray-500">Description</Label>
              <p className="text-gray-800">{item.description}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">
                If this item belongs to you, please contact the metro station lost & found office or call:
              </p>
              <div className="flex items-center text-metro-green font-medium">
                <Phone className="mr-2 h-4 w-4" />
                <span>+880 1234-567890</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const LostFoundPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [reportFormData, setReportFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    contact: "",
  });
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  const filteredItems = lostItemsData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report submitted successfully",
      description: "We'll contact you if we find your item.",
    });
    setShowReportDialog(false);
    setReportFormData({
      title: "",
      description: "",
      location: "",
      date: "",
      contact: "",
    });
  };
  
  const handleReportFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lost & Found</h1>
          <p className="mt-2 text-gray-600">Search for lost items or report something you've lost</p>
        </div>
        
        <Tabs defaultValue="found" className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="found">Found Items</TabsTrigger>
              <TabsTrigger value="report">Report Lost Item</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search lost items..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="found" className="space-y-6">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <LostFoundItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No items found matching your search.</p>
                <Button variant="link" onClick={() => setSearchTerm("")}>
                  Clear search
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Report a Lost Item</CardTitle>
                <CardDescription>
                  Fill out the form below to report something you've lost on the metro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReportSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Item Name</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., Blue Wallet"
                        value={reportFormData.title}
                        onChange={handleReportFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Last Seen Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., Uttara North Station"
                        value={reportFormData.location}
                        onChange={handleReportFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date">Date Lost</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={reportFormData.date}
                        onChange={handleReportFormChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        name="contact"
                        placeholder="Your phone number"
                        value={reportFormData.contact}
                        onChange={handleReportFormChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Item Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide a detailed description of the lost item..."
                      className="min-h-[120px]"
                      value={reportFormData.description}
                      onChange={handleReportFormChange}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-metro-green">Submit Report</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LostFoundPage;
