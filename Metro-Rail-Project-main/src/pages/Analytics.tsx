import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout"; // ✅ Add this
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface AnalyticsData {
  total_users: number;
  total_journeys: number;
  total_payments: number;
  revenue_by_year: Record<string, number>;
}

const Analytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/analytics/summary/");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    };

    fetchData();
  }, []);

  const revenueChartData = data
    ? Object.entries(data.revenue_by_year).map(([year, revenue]) => ({
        year,
        revenue,
      }))
    : [];

  return (
    <Layout isLoggedIn={!!localStorage.getItem("token")}>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <h1 className="text-3xl font-bold text-center">Metro Rail Analytics</h1>

        {data ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{data.total_users}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tickets Sold</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{data.total_journeys}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{data.total_payments.toFixed(2)} Tk</p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Yearly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#34D399" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading analytics...</p>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
