import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertCircle } from "lucide-react";

const AdminDashboard = () => {
  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manage Journeys */}
          <Link to="/admin/journeys">
            <Card className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>Manage Journeys</CardTitle>
              </CardHeader>
              <CardContent>View and manage metro journeys.</CardContent>
            </Card>
          </Link>

          {/* Manage Service Alerts */}
          <Link to="/admin/alerts">
            <Card className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>Manage Service Alerts</CardTitle>
              </CardHeader>
              <CardContent>Create and control service alerts for users.</CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
