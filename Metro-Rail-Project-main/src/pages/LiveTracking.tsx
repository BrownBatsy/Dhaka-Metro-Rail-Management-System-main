import Layout from "@/components/layout/Layout";
import { MapPin, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const weekdaySchedule = [
	{
		station: "Uttara North",
		firstTrain: "06:00",
		lastTrain: "22:00",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Uttara Center",
		firstTrain: "06:03",
		lastTrain: "22:03",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Uttara South",
		firstTrain: "06:06",
		lastTrain: "22:06",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Pallabi",
		firstTrain: "06:10",
		lastTrain: "22:10",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Mirpur 11",
		firstTrain: "06:14",
		lastTrain: "22:14",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Mirpur 10",
		firstTrain: "06:18",
		lastTrain: "22:18",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Kazipara",
		firstTrain: "06:22",
		lastTrain: "22:22",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Shewrapara",
		firstTrain: "06:26",
		lastTrain: "22:26",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Agargaon",
		firstTrain: "06:30",
		lastTrain: "22:30",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Farmgate",
		firstTrain: "06:35",
		lastTrain: "22:35",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Karwan Bazar",
		firstTrain: "06:39",
		lastTrain: "22:39",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Shahbagh",
		firstTrain: "06:43",
		lastTrain: "22:43",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Dhaka University",
		firstTrain: "06:47",
		lastTrain: "22:47",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Bangladesh Secretariat",
		firstTrain: "06:51",
		lastTrain: "22:51",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
	{
		station: "Motijheel",
		firstTrain: "06:55",
		lastTrain: "22:55",
		peakFrequency: "10 min",
		offPeakFrequency: "15 min",
	},
];

const weekendSchedule = [
	{
		station: "Uttara North",
		firstTrain: "07:00",
		lastTrain: "22:00",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Uttara Center",
		firstTrain: "07:03",
		lastTrain: "22:03",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Uttara South",
		firstTrain: "07:06",
		lastTrain: "22:06",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Pallabi",
		firstTrain: "07:10",
		lastTrain: "22:10",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Mirpur 11",
		firstTrain: "07:14",
		lastTrain: "22:14",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Mirpur 10",
		firstTrain: "07:18",
		lastTrain: "22:18",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Kazipara",
		firstTrain: "07:22",
		lastTrain: "22:22",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Shewrapara",
		firstTrain: "07:26",
		lastTrain: "22:26",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Agargaon",
		firstTrain: "07:30",
		lastTrain: "22:30",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Farmgate",
		firstTrain: "07:35",
		lastTrain: "22:35",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Karwan Bazar",
		firstTrain: "07:39",
		lastTrain: "22:39",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Shahbagh",
		firstTrain: "07:43",
		lastTrain: "22:43",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Dhaka University",
		firstTrain: "07:47",
		lastTrain: "22:47",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Bangladesh Secretariat",
		firstTrain: "07:51",
		lastTrain: "22:51",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
	{
		station: "Motijheel",
		firstTrain: "07:55",
		lastTrain: "22:55",
		peakFrequency: "15 min",
		offPeakFrequency: "20 min",
	},
];

const holidaySchedule = [
	{
		station: "Uttara North",
		firstTrain: "08:00",
		lastTrain: "21:00",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Uttara Center",
		firstTrain: "08:03",
		lastTrain: "21:03",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Uttara South",
		firstTrain: "08:06",
		lastTrain: "21:06",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Pallabi",
		firstTrain: "08:10",
		lastTrain: "21:10",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Mirpur 11",
		firstTrain: "08:14",
		lastTrain: "21:14",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Mirpur 10",
		firstTrain: "08:18",
		lastTrain: "21:18",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Kazipara",
		firstTrain: "08:22",
		lastTrain: "21:22",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Shewrapara",
		firstTrain: "08:26",
		lastTrain: "21:26",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Agargaon",
		firstTrain: "08:30",
		lastTrain: "21:30",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Farmgate",
		firstTrain: "08:35",
		lastTrain: "21:35",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Karwan Bazar",
		firstTrain: "08:39",
		lastTrain: "21:39",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Shahbagh",
		firstTrain: "08:43",
		lastTrain: "21:43",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Dhaka University",
		firstTrain: "08:47",
		lastTrain: "21:47",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Bangladesh Secretariat",
		firstTrain: "08:51",
		lastTrain: "21:51",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
	{
		station: "Motijheel",
		firstTrain: "08:55",
		lastTrain: "21:55",
		peakFrequency: "20 min",
		offPeakFrequency: "30 min",
	},
];

const formatDateTimeInput = (date: any) => {
	return date;
};

const formatTime24Hour = (time) => {
	const [hours, minutes] = time.split(":");
	return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

const LiveTracking = () => {
	const [currentStatus, setCurrentStatus] = useState([]);
	const [selectedDateTime, setSelectedDateTime] = useState(new Date());

	const calculateLiveStatus = (dateTime) => {
		let now = dateTime || new Date();
		now = new Date(now.setHours(6));
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const currentTime = hours * 60 + minutes;

		const status = weekdaySchedule.map((station) => {
			const firstTrainTime =
				parseInt(station.firstTrain.split(":")[0]) * 60 +
				parseInt(station.firstTrain.split(":")[1]);
			const lastTrainTime =
				parseInt(station.lastTrain.split(":")[0]) * 60 +
				parseInt(station.lastTrain.split(":")[1]);

			if (currentTime < firstTrainTime) {
				return {
					station: station.station,
					status: "No Train Yet",
					nextTrain: formatTime24Hour(station.firstTrain),
				};
			} else if (currentTime > lastTrainTime) {
				return {
					station: station.station,
					status: "Service Ended",
					nextTrain: "Tomorrow",
				};
			} else {
				const frequency =
					currentTime % 15 === 0
						? station.peakFrequency
						: station.offPeakFrequency;
				const nextTrainMinutes =
					(currentTime + parseInt(frequency.split(" ")[0])) % 60;
				const nextTrainHours = Math.floor(
					(currentTime + parseInt(frequency.split(" ")[0])) / 60
				);
				const nextTrain = `${String(nextTrainHours).padStart(
					2,
					"0"
				)}:${String(nextTrainMinutes).padStart(2, "0")}`;
				return {
					station: station.station,
					status: "Train Running",
					nextTrain: formatTime24Hour(nextTrain),
				};
			}
		});

		setCurrentStatus(status);
	};

	const handleDateTimeChange = (e) => {
		setSelectedDateTime(e.target.value);
		calculateLiveStatus(new Date(e.target.value));
	};

	return (
		<Layout isLoggedIn={true}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Live Train Status
					</h1>
					<div className="flex items-center gap-4">
						<Input
							type="datetime-local"
							value={formatDateTimeInput(selectedDateTime)}
							onChange={handleDateTimeChange}
							className="border rounded-md px-3 py-2"
						/>
						<Button
							variant="outline"
							onClick={() =>
								calculateLiveStatus(selectedDateTime)
							}
						>
							<RefreshCw className="mr-2 h-4 w-4" /> Refresh
						</Button>
					</div>
				</div>
				<div className="relative bg-gray-100 border rounded-md p-4">
					<h2 className="text-xl font-bold text-gray-900 mb-4">
						Train Location Map
					</h2>
					<div className="relative h-96">
						<div className="absolute inset-0 flex flex-col justify-between">
							{weekdaySchedule.map((station, index) => (
								<div
									key={index}
									className="flex items-center justify-between px-4"
								>
									<span className="text-sm text-gray-600">
										{station.station}
									</span>
									<div
										className={`h-2 w-2 rounded-full ${
											currentStatus.find(
												(status) =>
													status.station ===
														station.station &&
													status.status ===
														"Train Running"
											)
												? "bg-metro-green"
												: "bg-gray-400"
										}`}
									></div>
								</div>
							))}
						</div>
						<div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gray-300"></div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default LiveTracking;
