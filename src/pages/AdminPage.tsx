import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Navigation from "../components/Navigation";
import FrequencyForm from "../components/FrequencyForm";
import { useAuth } from "../hooks/useAuth";

const API_URL = "https://radiofreq-production.up.railway.app/api/frequencies/all";

interface FrequencyData {
  timestamp: number;
  frequency_37: string;
  frequency_38: string;
  description: string;
}

const AdminPage = () => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  const [frequencies, setFrequencies] = useState<FrequencyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFrequencies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch frequencies");
        }
        const data: FrequencyData[] = await response.json();
        setFrequencies(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFrequencies();
  }, []);

  return (
    <Box>
      <Navigation
        user={user}
        isAdmin={isAdmin}
        onLogin={loginWithGoogle}
        onLogout={logout}
      />
      <Box textAlign="center" mt={4}>
        <Typography variant="h4">Admin Dashboard</Typography>
        {isAdmin ? (
          <>
            <FrequencyForm isAdmin={isAdmin} />
            {/* Table Section */}
            <Box mt={4}>
              <Typography variant="h5">Frequency Data</Typography>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Timestamp</strong></TableCell>
                        <TableCell><strong>Frequency 37</strong></TableCell>
                        <TableCell><strong>Frequency 38</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {frequencies.map((freq) => (
                        <TableRow key={freq.timestamp}>
                          <TableCell>{new Date(freq.timestamp).toLocaleString()}</TableCell>
                          <TableCell>{freq.frequency_37}</TableCell>
                          <TableCell>{freq.frequency_38}</TableCell>
                          <TableCell>{freq.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </>
        ) : (
          <Typography color="error">Only admins can add frequencies.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminPage;
