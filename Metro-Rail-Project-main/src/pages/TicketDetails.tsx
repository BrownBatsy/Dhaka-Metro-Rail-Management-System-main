import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";

const TicketDetails = () => {
	const { ticketId } = useParams();
	const [ticket, setTicket] = useState(null);

	useEffect(() => {
		const fetchTicket = async () => {
			try {
				const response = await fetch(
					`http://localhost:8000/api/all-tickets/`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch ticket details");
				}
				const data = await response.json();

				// Filter the ticket based on the ticketId from the URL params
				const selectedTicket = data.find(
					(ticket) => ticket.id === Number(ticketId)
				);
				setTicket(selectedTicket); // Update the state with the selected ticket
			} catch (error) {
				console.error("Error fetching ticket details:", error);
			}
		};
		fetchTicket();
	}, [ticketId]);

	if (!ticket) {
		return <p className="text-center mt-8">Loading ticket details...</p>;
	}

	return (
		<Layout isLoggedIn={true}>
			<div className="container mx-auto py-8 px-4">
				<h1 className="text-3xl font-bold text-center mb-6">
					Ticket Details
				</h1>
				<div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
					<div className="mb-4">
						<h2 className="text-xl font-semibold text-gray-800">
							User Information
						</h2>
						<p className="text-gray-600">
							<strong>Name:</strong> {ticket.user.name}
						</p>
						<p className="text-gray-600">
							<strong>Email:</strong> {ticket.user.email}
						</p>
					</div>
					<div className="mb-4">
						<h2 className="text-xl font-semibold text-gray-800">
							Ticket Information
						</h2>
						<p className="text-gray-600">
							<strong>Destination:</strong> {ticket.destination}
						</p>
						<p className="text-gray-600">
							<strong>Price:</strong> {ticket.price} Tk
						</p>
						<p className="text-gray-600">
							<strong>Buying Time:</strong>{" "}
							{new Date(ticket.created_at).toLocaleString()}
						</p>
					</div>
					<div className="text-center">
						<p className="text-sm text-gray-500 italic">
							Ticket ID: {ticket.ticket_id}
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default TicketDetails;
