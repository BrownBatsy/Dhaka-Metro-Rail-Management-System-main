// src/pages/AdminAlerts.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/layout/Layout";

interface Alert {
  id: number;
  title: string;
  message: string;
  is_active: boolean;
  affected_stations: string;
  estimated_duration: string;
  alternative_routes: string;
}

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    affected_stations: "",
    estimated_duration: "",
    alternative_routes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/api/service-alerts/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();
    setAlerts(data);
  };

  const createAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8000/api/service-alerts/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newAlert,
          alert_type: "info",
        }),
      });
      if (res.ok) {
        setNewAlert({
          title: "",
          message: "",
          affected_stations: "",
          estimated_duration: "",
          alternative_routes: "",
        });
        fetchAlerts();
      } else {
        console.error("Failed to create alert");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDisplay = async (id: number, activate: boolean) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8000/api/service-alerts/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: activate }),
      });
      if (res.ok) {
        fetchAlerts();
      } else {
        console.error("Failed to update alert");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Manage Alerts</h1>

        {/* Alert creation form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createAlert} className="space-y-4">
              <Input
                required
                placeholder="Title"
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
              />
              <Textarea
                required
                placeholder="Message"
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
                value={newAlert.alternative_routes}
                onChange={(e) => setNewAlert({ ...newAlert, alternative_routes: e.target.value })}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Alert"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Alerts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{alert.title}</TableCell>
                      <TableCell>
                        {alert.is_active ? (
                          <span className="text-green-600 font-medium">Active</span>
                        ) : (
                          <span className="text-gray-500 font-medium">Inactive</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {alert.is_active ? (
                          <Button variant="outline" size="sm" onClick={() => toggleDisplay(alert.id, false)}>
                            Disable
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => toggleDisplay(alert.id, true)}>
                            Display
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No alerts created yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminAlerts;
