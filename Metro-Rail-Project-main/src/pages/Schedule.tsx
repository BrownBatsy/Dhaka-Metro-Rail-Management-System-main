import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, Download } from "lucide-react";
import { useState } from "react";

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("weekday");

  // Sample schedule data
  const weekdaySchedule = [
    { station: "Uttara North", firstTrain: "06:00", lastTrain: "22:00", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Uttara Center", firstTrain: "06:03", lastTrain: "22:03", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Uttara South", firstTrain: "06:06", lastTrain: "22:06", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Pallabi", firstTrain: "06:10", lastTrain: "22:10", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Mirpur 11", firstTrain: "06:14", lastTrain: "22:14", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Mirpur 10", firstTrain: "06:18", lastTrain: "22:18", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Kazipara", firstTrain: "06:22", lastTrain: "22:22", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Shewrapara", firstTrain: "06:26", lastTrain: "22:26", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Agargaon", firstTrain: "06:30", lastTrain: "22:30", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Farmgate", firstTrain: "06:35", lastTrain: "22:35", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Karwan Bazar", firstTrain: "06:39", lastTrain: "22:39", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Shahbagh", firstTrain: "06:43", lastTrain: "22:43", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Dhaka University", firstTrain: "06:47", lastTrain: "22:47", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Bangladesh Secretariat", firstTrain: "06:51", lastTrain: "22:51", peakFrequency: "10 min", offPeakFrequency: "15 min" },
    { station: "Motijheel", firstTrain: "06:55", lastTrain: "22:55", peakFrequency: "10 min", offPeakFrequency: "15 min" },
  ];

  const weekendSchedule = [
    { station: "Uttara North", firstTrain: "07:00", lastTrain: "22:00", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Uttara Center", firstTrain: "07:03", lastTrain: "22:03", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Uttara South", firstTrain: "07:06", lastTrain: "22:06", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Pallabi", firstTrain: "07:10", lastTrain: "22:10", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Mirpur 11", firstTrain: "07:14", lastTrain: "22:14", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Mirpur 10", firstTrain: "07:18", lastTrain: "22:18", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Kazipara", firstTrain: "07:22", lastTrain: "22:22", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Shewrapara", firstTrain: "07:26", lastTrain: "22:26", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Agargaon", firstTrain: "07:30", lastTrain: "22:30", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Farmgate", firstTrain: "07:35", lastTrain: "22:35", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Karwan Bazar", firstTrain: "07:39", lastTrain: "22:39", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Shahbagh", firstTrain: "07:43", lastTrain: "22:43", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Dhaka University", firstTrain: "07:47", lastTrain: "22:47", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Bangladesh Secretariat", firstTrain: "07:51", lastTrain: "22:51", peakFrequency: "15 min", offPeakFrequency: "20 min" },
    { station: "Motijheel", firstTrain: "07:55", lastTrain: "22:55", peakFrequency: "15 min", offPeakFrequency: "20 min" },
  ];

  const holidaySchedule = [
    { station: "Uttara North", firstTrain: "08:00", lastTrain: "21:00", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Uttara Center", firstTrain: "08:03", lastTrain: "21:03", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Uttara South", firstTrain: "08:06", lastTrain: "21:06", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Pallabi", firstTrain: "08:10", lastTrain: "21:10", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Mirpur 11", firstTrain: "08:14", lastTrain: "21:14", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Mirpur 10", firstTrain: "08:18", lastTrain: "21:18", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Kazipara", firstTrain: "08:22", lastTrain: "21:22", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Shewrapara", firstTrain: "08:26", lastTrain: "21:26", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Agargaon", firstTrain: "08:30", lastTrain: "21:30", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Farmgate", firstTrain: "08:35", lastTrain: "21:35", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Karwan Bazar", firstTrain: "08:39", lastTrain: "21:39", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Shahbagh", firstTrain: "08:43", lastTrain: "21:43", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Dhaka University", firstTrain: "08:47", lastTrain: "21:47", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Bangladesh Secretariat", firstTrain: "08:51", lastTrain: "21:51", peakFrequency: "20 min", offPeakFrequency: "30 min" },
    { station: "Motijheel", firstTrain: "08:55", lastTrain: "21:55", peakFrequency: "20 min", offPeakFrequency: "30 min" },
  ];

  return (
    <Layout isLoggedIn={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Train Schedule</h1>
            <p className="mt-2 text-gray-600">Check the latest metro rail schedules</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download Schedule
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-metro-green" />
              Operating Hours
            </CardTitle>
            <CardDescription>Regular operating hours for Dhaka Metro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium flex items-center mb-2">
                  <Calendar className="mr-2 h-4 w-4 text-metro-green" />
                  Weekdays (Sunday-Thursday)
                </h3>
                <p className="text-sm text-gray-600">First Train: 6:00 AM</p>
                <p className="text-sm text-gray-600">Last Train: 10:55 PM</p>
                <p className="text-sm text-gray-600 mt-2">Peak Hours: 7:00 AM - 10:00 AM, 5:00 PM - 8:00 PM</p>
                <p className="text-sm text-gray-600">Peak Frequency: Every 10 minutes</p>
                <p className="text-sm text-gray-600">Off-peak Frequency: Every 15 minutes</p>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium flex items-center mb-2">
                  <Calendar className="mr-2 h-4 w-4 text-metro-green" />
                  Weekends (Friday-Saturday)
                </h3>
                <p className="text-sm text-gray-600">First Train: 7:00 AM</p>
                <p className="text-sm text-gray-600">Last Train: 10:55 PM</p>
                <p className="text-sm text-gray-600 mt-2">Peak Hours: 10:00 AM - 8:00 PM</p>
                <p className="text-sm text-gray-600">Peak Frequency: Every 15 minutes</p>
                <p className="text-sm text-gray-600">Off-peak Frequency: Every 20 minutes</p>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium flex items-center mb-2">
                  <Calendar className="mr-2 h-4 w-4 text-metro-green" />
                  Public Holidays
                </h3>
                <p className="text-sm text-gray-600">First Train: 8:00 AM</p>
                <p className="text-sm text-gray-600">Last Train: 9:55 PM</p>
                <p className="text-sm text-gray-600 mt-2">Peak Hours: 10:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-600">Peak Frequency: Every 20 minutes</p>
                <p className="text-sm text-gray-600">Off-peak Frequency: Every 30 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-metro-green" />
              Station Schedules
            </CardTitle>
            <CardDescription>Detailed timings for each metro station</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekday" onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
                <TabsTrigger value="weekday" className={activeTab === "weekday" ? "metro-tab-active" : "metro-tab"}>
                  Weekdays
                </TabsTrigger>
                <TabsTrigger value="weekend" className={activeTab === "weekend" ? "metro-tab-active" : "metro-tab"}>
                  Weekends
                </TabsTrigger>
                <TabsTrigger value="holiday" className={activeTab === "holiday" ? "metro-tab-active" : "metro-tab"}>
                  Holidays
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="weekday">
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Train</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Train</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Frequency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Off-Peak Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {weekdaySchedule.map((station) => (
                        <tr key={station.station}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{station.station}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{station.firstTrain} AM</td>
                          <td className="px-6 py-4 whitespace-nowrap">{station.lastTrain} PM</td>
                          <td className="px-6 py-4 whitespace-nowrap">Every {station.peakFrequency}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Every {station.offPeakFrequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="weekend">
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Train</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Train</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Frequency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Off-Peak Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {weekendSchedule.map((station) => (
                        <tr key={station.station}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{station.station}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{station.firstTrain} AM</td>
                          <td className="px-6 py-4 whitespace-nowrap">{station.lastTrain} PM</td>
                          <td className="px-6 py-4 whitespace-nowrap">Every {station.peakFrequency}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Every {station.offPeakFrequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="holiday">
                <div className="border rounded-md overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Train</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Train</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Frequency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Off-Peak Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {holidaySchedule.map((station) => (
                        <tr key={station.station}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{station.station}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{station.firstTrain} AM</td>
                          <td className="px-6 py-4 whitespace-nowrap">{station.lastTrain} PM</td>
                          <td className="px-6 py-4 whitespace-nowrap">Every {station.peakFrequency}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Every {station.offPeakFrequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Schedule; 