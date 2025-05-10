import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, CreditCard, Calendar, TrendingUp, AlertCircle, FileText, Loader2, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next"; // <-- Add this

// Payment method badges
const PaymentBadge = ({ method }: { method: string }) => {
  switch (method) {
    case 'bKash':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">bKash</span>;
    case 'Nagad':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Nagad</span>;
    case 'Rocket':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Rocket</span>;
    case 'Card':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Card</span>;
    default:
      return null;
  }
};

interface Journey {
  id: number;
  date: string;
  route: string;
  fare: number;
  payment: number | null;
}

interface Payment {
  id: number;
  method: string;
  reference: string;
  amount: number;
  timestamp: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // <-- Add this

  useEffect(() => {
    const loadUserData = () => {
      const userDataStr = localStorage.getItem('user');
      if (!userDataStr) {
        navigate('/login');
        return;
      }
      
      try {
        const userData = JSON.parse(userDataStr);
        setUserData(userData);
        setIsAdmin(userData.is_Admin || false);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    };
    
    loadUserData();
  }, [navigate]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        
        // Fetch journeys
        const journeysResponse = await fetch('http://localhost:8000/api/journeys/', {
          headers: {
            'Authorization': `Token ${token}`,
          }
        });
        
        // Fetch payments
        const paymentsResponse = await fetch('http://localhost:8000/api/payments/', {
          headers: {
            'Authorization': `Token ${token}`,
          }
        });
        
        if (!journeysResponse.ok || !paymentsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const journeysData = await journeysResponse.json();
        const paymentsData = await paymentsResponse.json();
        
        setJourneys(journeysData);
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [navigate, toast]);
  
  // Calculate monthly statistics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyJourneys = journeys.filter(journey => {
    const journeyDate = new Date(journey.date);
    return journeyDate.getMonth() === currentMonth && journeyDate.getFullYear() === currentYear;
  });
  
  const totalSpent = monthlyJourneys.reduce((total, journey) => {
    const fareValue = typeof journey.fare === 'string' ? parseFloat(journey.fare) : journey.fare;
    return total + fareValue;
  }, 0);
  
  // Calculate most frequent route
  const routeCounts: Record<string, number> = {};
  monthlyJourneys.forEach(journey => {
    routeCounts[journey.route] = (routeCounts[journey.route] || 0) + 1;
  });
  
  let mostFrequentRoute = "";
  let maxCount = 0;
  
  Object.entries(routeCounts).forEach(([route, count]) => {
    if (count > maxCount) {
      mostFrequentRoute = route;
      maxCount = count;
    }
  });
  
  const monthlyStats = {
    journeys: monthlyJourneys.length,
    totalSpent,
    mostFrequentRoute,
    mostFrequentCount: maxCount,
  };
  
  // Get payment methods distribution
  const paymentMethodCounts: Record<string, { count: number, amount: number }> = {};
  payments.forEach(payment => {
    if (!paymentMethodCounts[payment.method]) {
      paymentMethodCounts[payment.method] = { count: 0, amount: 0 };
    }
    paymentMethodCounts[payment.method].count += 1;
    const paymentAmount = typeof payment.amount === 'string' ? parseFloat(payment.amount) : payment.amount;
    paymentMethodCounts[payment.method].amount += paymentAmount;
  });

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`px-3 py-1 mr-2 rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            English
          </button>
          <button
            onClick={() => i18n.changeLanguage('bn')}
            className={`px-3 py-1 rounded ${i18n.language === 'bn' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            বাংলা
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("dashboardTitle")}</h1>
            <p className="mt-1 text-gray-600">{t("dashboardWelcome", { name: userData?.name || t("user") })}</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            {isAdmin && (
              <>
                <Link to="/admin/journeys">
                  <Button variant="outline" className="ml-2">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    {t("adminPanel")}
                  </Button>
                </Link>
                <Link to="/admin/alerts">
                  <Button variant="outline" className="ml-2">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    {t("alert")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-metro-green" />
          </div>
        ) : (
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
              <TabsTrigger value="overview" className={activeTab === "overview" ? "metro-tab-active" : "metro-tab"}>
                {t("overview")}
              </TabsTrigger>
              <TabsTrigger value="journeys" className={activeTab === "journeys" ? "metro-tab-active" : "metro-tab"}>
                {t("journeysTab")}
              </TabsTrigger>
              <TabsTrigger value="payments" className={activeTab === "payments" ? "metro-tab-active" : "metro-tab"}>
                {t("paymentsTab")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("totalJourneys")}</CardTitle>
                    <Calendar className="h-4 w-4 text-metro-green" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{monthlyStats.journeys}</div>
                    <p className="text-xs text-gray-500 mt-1">{t("thisMonth")}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("totalSpent")}</CardTitle>
                    <CreditCard className="h-4 w-4 text-metro-blue" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalSpent.toFixed(2)} {t("tk")}</div>
                    <p className="text-xs text-gray-500 mt-1">{t("thisMonth")}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("mostFrequentRoute")}</CardTitle>
                    <MapPin className="h-4 w-4 text-metro-green" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium">{monthlyStats.mostFrequentRoute || t("noJourneysYet")}</div>
                    {monthlyStats.mostFrequentCount > 0 && (
                      <p className="text-xs text-gray-500 mt-1">{t("timesThisMonth", { count: monthlyStats.mostFrequentCount })}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t("recentJourneys")}</CardTitle>
                    <CardDescription>{t("latestTrips")}</CardDescription>
                  </div>
                  <Link to="/journeys">
                    <Button variant="outline" size="sm">{t("viewAll")}</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeys.length > 0 ? (
                      journeys.slice().reverse().slice(0, 3).map((journey) => {
                        const payment = journey.payment 
                          ? payments.find(p => p.id === journey.payment) 
                          : null;
                        return (
                          <div key={journey.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <div className="bg-metro-green rounded-full p-2 mr-4">
                                <MapPin className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{journey.route}</p>
                                <p className="text-sm text-gray-500">{journey.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{journey.fare} {t("tk")}</p>
                              {payment && (
                                <div className="mt-1">
                                  <PaymentBadge method={payment.method} />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>{t("noJourneyRecords")}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/journeys">
                      <Button variant="outline" className="w-full">{t("viewAllJourneys")}</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("spendingPatterns")}</CardTitle>
                    <CardDescription>{t("transportationExpenses")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{t("monthlyLimit")}</p>
                          <p className="text-sm font-medium">
                            {totalSpent > 0 ? Math.min(Math.round((totalSpent / 1000) * 100), 100) : 0}%
                          </p>
                        </div>
                        <Progress 
                          value={totalSpent > 0 ? Math.min(Math.round((totalSpent / 1000) * 100), 100) : 0} 
                          className="h-2 bg-gray-200" 
                        />
                        <p className="mt-1 text-xs text-gray-500">{t("budgetUsed", { used: totalSpent.toFixed(2) })}</p>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="font-medium mb-2">{t("paymentMethods")}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(paymentMethodCounts).length > 0 ? (
                            Object.entries(paymentMethodCounts).map(([method, data]) => (
                              <div key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div className="flex items-center">
                                  <PaymentBadge method={method} />
                                  <span className="text-xs text-gray-500 ml-2">({data.count})</span>
                                </div>
                                <p className="text-sm font-medium">{data.amount.toFixed(2)} {t("tk")}</p>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 text-center py-4 text-gray-500">
                              <p>{t("noPaymentRecords")}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("quickActions")}</CardTitle>
                    <CardDescription>{t("commonlyUsedFeatures")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/lost-found" className="w-full">
                        <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-dashed w-full">
                          <FileText className="h-8 w-8 mb-2 text-metro-green" />
                          <span>{t("reportLostItem")}</span>
                        </Button>
                      </Link>
                      <Link to="/payments" className="w-full">
                        <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-dashed w-full">
                          <CreditCard className="h-8 w-8 mb-2 text-metro-blue" />
                          <span>{t("makePayment")}</span>
                        </Button>
                      </Link>
                      <Link to="/schedule" className="w-full">
                        <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-dashed w-full">
                          <Clock className="h-8 w-8 mb-2 text-metro-green" />
                          <span>{t("checkSchedule")}</span>
                        </Button>
                      </Link>
                      <Link to="/feedback" className="w-full">
                        <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-dashed w-full">
                          <AlertCircle className="h-8 w-8 mb-2 text-metro-blue" />
                          <span>{t("submitFeedback")}</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="journeys">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t("journeyHistory")}</CardTitle>
                    <CardDescription>{t("completeTripList")}</CardDescription>
                  </div>
                  <Link to="/journeys">
                    <Button variant="outline" size="sm">{t("viewAll")}</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {journeys.length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("date")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("route")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("fare")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("payment")}</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {journeys.slice().reverse().slice(0, 5).map((journey) => {
                            const payment = journey.payment 
                              ? payments.find(p => p.id === journey.payment) 
                              : null;
                            return (
                              <tr key={journey.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{journey.date}</td>
                                <td className="px-6 py-4">{journey.route}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{journey.fare} {t("tk")}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {payment ? (
                                    <PaymentBadge method={payment.method} />
                                  ) : (
                                    <span className="text-red-500 text-sm">{t("unpaid")}</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>{t("noJourneyRecords")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>{t("paymentHistory")}</CardTitle>
                  <CardDescription>{t("paymentRecord")}</CardDescription>
                </CardHeader>
                <CardContent>
                  {payments.length > 0 ? (
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("date")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("method")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("reference")}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("amount")}</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {payments.slice().reverse().slice(0, 5).map((payment) => (
                            <tr key={payment.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(payment.timestamp).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <PaymentBadge method={payment.method} />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">{payment.reference}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{payment.amount} {t("tk")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>{t("noPaymentRecords")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;