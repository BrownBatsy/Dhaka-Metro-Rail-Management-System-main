import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";

const CreateTicket = () => {
	const [destination, setDestination] = useState("");
	const [price, setPrice] = useState("");
	const [tickets, setTickets] = useState([]);
	const navigate = useNavigate();
	const { toast } = useToast();

	const fetchTickets = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast({
					title: "Authentication required",
					description: "You must be logged in to view your tickets.",
					variant: "destructive",
				});
				navigate("/login");
				return;
			}

			const response = await fetch("http://localhost:8000/api/tickets/", {
				headers: {
					Authorization: `Token ${token}`, // Ensure "Token" prefix is used
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch tickets");
			}

			const data = await response.json();
			setTickets(data);
		} catch (error) {
			console.error("Error fetching tickets:", error);
			toast({
				title: "Error",
				description: "Failed to load tickets.",
				variant: "destructive",
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token"); // Retrieve the auth token
			if (!token) {
				toast({
					title: "Authentication required",
					description: "You must be logged in to create a ticket.",
					variant: "destructive",
				});
				navigate("/login");
				return;
			}

			const response = await fetch(
				"http://localhost:8000/api/create-ticket/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${token}`, // Ensure "Token" prefix is used
					},
					body: JSON.stringify({ destination, price }),
				}
			);

			if (response.status === 401) {
				toast({
					title: "Session expired",
					description: "Please log in again to continue.",
					variant: "destructive",
				});
				navigate("/login");
				return;
			}

			if (response.status === 500) {
				toast({
					title: "Server error",
					description:
						"An error occurred on the server. Please try again later.",
					variant: "destructive",
				});
				return;
			}

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Error: ${response.status} - ${errorText}`);
			}

			const data = await response.json();
			toast({
				title: "Ticket created successfully",
				description: "Your ticket has been created.",
			});
			setDestination("");
			setPrice("");
			fetchTickets();
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Error creating ticket",
				description: error.message || "An unexpected error occurred.",
				variant: "destructive",
			});
		}
	};

	const deleteTicket = async (ticketId) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast({
					title: "Authentication required",
					description: "You must be logged in to delete a ticket.",
					variant: "destructive",
				});
				navigate("/login");
				return;
			}

			const response = await fetch(
				`http://localhost:8000/api/tickets/${ticketId}/`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to delete ticket");
			}

			toast({
				title: "Ticket deleted successfully",
				description: `Ticket ${ticketId} has been removed.`,
			});
			fetchTickets(); // Refresh the ticket list
		} catch (error) {
			console.error("Error deleting ticket:", error);
			toast({
				title: "Error",
				description: "Failed to delete the ticket.",
				variant: "destructive",
			});
		}
	};

	const generateQRCode = async (ticketId) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast({
					title: "Authentication required",
					description: "You must be logged in to generate a QR code.",
					variant: "destructive",
				});
				navigate("/login");
				return;
			}

			const response = await fetch(
				`http://localhost:8000/api/ticket-qr/${ticketId}/`,
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to generate QR code");
			}

			const data = await response.json();
			const qrBlob = await fetch(
				`data:image/png;base64,${data.qr_image}`
			).then((res) => res.blob());
			saveAs(qrBlob, `ticket_${ticketId}_qr.png`);
			toast({
				title: "QR Code Generated",
				description: `QR code for ticket ${ticketId} has been saved.`,
			});
		} catch (error) {
			console.error("Error generating QR code:", error);
			toast({
				title: "Error",
				description: "Failed to generate the QR code.",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		fetchTickets();
	}, [navigate, toast]);

	return (
		<Layout isLoggedIn={true}>
			<div className="container mx-auto py-8">
				<h1 className="text-2xl font-bold mb-4">Create Ticket</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						placeholder="Destination"
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
					/>
					<Input
						placeholder="Price"
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Button type="submit" className="bg-metro-green text-white">
						Create Ticket
					</Button>
				</form>

				<h2 className="text-xl font-bold mt-8 mb-4">Your Tickets</h2>
				{tickets.length > 0 ? (
					<ul className="space-y-4">
						{tickets.map((ticket) => (
							<li
								key={ticket.id}
								className="border p-4 rounded-md flex justify-between items-center"
							>
								<div>
									<p>
										<strong>Destination:</strong>{" "}
										{ticket.destination}
									</p>
									<p>
										<strong>Price:</strong> {ticket.price}{" "}
										Tk
									</p>
									<p>
										<strong>Created At:</strong>{" "}
										{new Date(
											ticket.created_at
										).toLocaleString()}
									</p>
								</div>
								<div className="flex space-x-2">
									<Button
										onClick={() =>
											generateQRCode(ticket.id)
										}
										className="bg-blue-500 text-white"
									>
										Generate QR
									</Button>
									<Button
										onClick={() => deleteTicket(ticket.id)}
										className="bg-red-500 text-white"
									>
										Remove
									</Button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p>No tickets found.</p>
				)}
			</div>
		</Layout>
	);
};

export default CreateTicket;
