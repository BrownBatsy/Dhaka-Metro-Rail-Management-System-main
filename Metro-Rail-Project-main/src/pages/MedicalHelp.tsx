import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:8000/api"; // Update to match your backend URL

const MedicalHelp = () => {
	const [medicalHelps, setMedicalHelps] = useState([]);
	const [problem, setProblem] = useState("");
	const [description, setDescription] = useState("");
	const { toast } = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${API_BASE_URL}/medical-help/`)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch medical help requests");
				}
				return res.json();
			})
			.then((data) => setMedicalHelps(data))
			.catch((error) => {
				console.error(error);
				toast({
					title: "Error",
					description: "Failed to load medical help requests",
					variant: "destructive",
				});
			});
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetch(`${API_BASE_URL}/medical-help/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ problem, description }),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to create medical help request");
				}
				return res.json();
			})
			.then((data) => {
				toast({
					title: "Success",
					description: "Medical help request created!",
				});
				setMedicalHelps([data, ...medicalHelps]);
				setProblem("");
				setDescription("");
			})
			.catch((error) => {
				console.error(error);
				toast({
					title: "Error",
					description: "Failed to create medical help request",
					variant: "destructive",
				});
			});
	};

	return (
		<Layout isLoggedIn={true}>
			<div className="container mx-auto py-8">
				<h1 className="text-2xl font-bold mb-6">Medical Help</h1>
				<form onSubmit={handleSubmit} className="mb-8">
					<Input
						placeholder="Problem"
						value={problem}
						onChange={(e) => setProblem(e.target.value)}
						required
					/>
					<Textarea
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<Button type="submit" className="mt-4">
						Submit
					</Button>
				</form>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{medicalHelps.length > 0 ? (
						medicalHelps.map((help) => (
							<Card
								key={help.id}
								onClick={() =>
									navigate(`/medical-help/${help.id}`)
								}
							>
								<CardHeader>
									<CardTitle>{help.problem}</CardTitle>
								</CardHeader>
								<CardContent>{help.description}</CardContent>
							</Card>
						))
					) : (
						<p>No medical help requests found.</p>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default MedicalHelp;
