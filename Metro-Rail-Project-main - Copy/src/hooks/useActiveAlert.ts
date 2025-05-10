import { useEffect, useState } from "react";

export interface ActiveAlert {
  id: number;
  title: string;
  message: string;
}

export const useActiveAlert = () => {
  const [alert, setAlert] = useState<ActiveAlert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/service-alerts/");
        if (!response.ok) {
          throw new Error("Failed to fetch alerts");
        }
        const data = await response.json();
        const activeAlert = data.find((item: any) => item.is_active);

        if (activeAlert) {
          setAlert(activeAlert);
        } else {
          setAlert(null);
        }
      } catch (error) {
        console.error("Error fetching active alert:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlert();
  }, []);

  return { alert, loading };
};
