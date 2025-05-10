import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface ServiceAlert {
  id: number;
  title: string;
  message: string;
  affected_stations: string;
  estimated_duration: string;
  alternative_routes: string;
  created_at: string;
  is_active: boolean;
}

const ServiceAlert = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<ServiceAlert[]>([]); // Ensure alerts is declared in the state
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    affected_stations: "",
    estimated_duration: "",
    alternative_routes: "",
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated!");

      const response = await fetch("http://localhost:8000/api/service-alerts/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch alerts");

      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load service alerts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated!");

      const response = await fetch("http://localhost:8000/api/service-alerts/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAlert,
          is_active: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to create alert");

      toast({
        title: "Success",
        description: "Service alert created successfully!",
      });

      setIsDialogOpen(false);
      setNewAlert({
        title: "",
        message: "",
        affected_stations: "",
        estimated_duration: "",
        alternative_routes: "",
      });

      fetchAlerts();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create alert",
        variant: "destructive",
      });
    }
  };

  const handleToggleAlert = async (alertId: number, newStatus: boolean) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated!");
  
      // Step 1: Disable all active alerts first if enabling new one
      if (newStatus) {
        const updatedAlerts = alerts.map((alert) => ({
          ...alert,
          is_active: alert.id === alertId, // only the clicked one becomes active
        }));
  
        setAlerts(updatedAlerts); // immediately update local UI first
  
        // Update the server for each
        await Promise.all(
          updatedAlerts.map((alert) =>
            fetch(`http://localhost:8000/api/service-alerts/${alert.id}/`, {
              method: "PATCH",
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ is_active: alert.is_active }),
            })
          )
        );
      } else {
        // If just disabling
        setAlerts((prev) =>
          prev.map((alert) =>
            alert.id === alertId ? { ...alert, is_active: false } : alert
          )
        );
  
        await fetch(`http://localhost:8000/api/service-alerts/${alertId}/`, {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: false }),
        });
      }
  
      toast({
        title: "Success",
        description: newStatus ? "Alert is now visible!" : "Alert has been hidden.",
      });
  
      // Small notification to Layout.tsx to refresh
      localStorage.setItem("alerts_last_update", Date.now().toString());
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update alert",
        variant: "destructive",
      });
    }
  };
  

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Service Alerts</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create New Alert</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Service Alert</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateAlert} className="space-y-4">
                <Input
                  required
                  placeholder="Title"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                />
                <Textarea
                  required
                  placeholder="Message"
                  rows={4}
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                />
                <Input
                  placeholder="Affected Stations"
                  value={newAlert.affected_stations}
                  onChange={(e) => setNewAlert({ ...newAlert, affected_stations: e.target.value })}
                />
                <Input
                  placeholder="Estimated Duration"
                  value={newAlert.estimated_duration}
                  onChange={(e) => setNewAlert({ ...newAlert, estimated_duration: e.target.value })}
                />
                <Textarea
                  placeholder="Alternative Routes"
                  rows={3}
                  value={newAlert.alternative_routes}
                  onChange={(e) => setNewAlert({ ...newAlert, alternative_routes: e.target.value })}
                />
                <Button type="submit" className="w-full">
                  Create Alert
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.title}</TableCell>
                  <TableCell>{new Date(alert.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        alert.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {alert.is_active ? "Visible" : "Hidden"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {alert.is_active ? (
                      <Button size="sm" variant="outline" onClick={() => handleToggleAlert(alert.id, false)}>
                        Disable
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleToggleAlert(alert.id, true)}>
                        Display
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceAlert;