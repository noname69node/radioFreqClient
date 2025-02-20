import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { auth } from "../firebaseConfig"; // Import Firebase auth

interface FrequencyFormProps {
  isAdmin: boolean;
}

const FrequencyForm: React.FC<FrequencyFormProps> = ({ isAdmin }) => {
  const [frequency37, setFrequency37] = useState("");
  const [frequency38, setFrequency38] = useState("");
  const [description, setDescription] = useState("");
  const [error37, setError37] = useState("");
  const [error38, setError38] = useState("");

  const handleFrequencyChange = (value: string, setter: (val: string) => void, setError: (msg: string) => void) => {
    if (/^\d{0,5}$/.test(value)) {
      setError("");
      setter(value);
    } else {
      setError("Enter only 5 digits");
    }
  };

  const formatFrequency = (value: string) => {
    return value.length === 5 ? `${value.slice(0, 2)}.${value.slice(2)}` : value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (frequency37.length !== 5 || frequency38.length !== 5) {
      setError37(frequency37.length !== 5 ? "Enter exactly 5 digits" : "");
      setError38(frequency38.length !== 5 ? "Enter exactly 5 digits" : "");
      return;
    }

    const newFrequency = {
      frequency_37: formatFrequency(frequency37),
      frequency_38: formatFrequency(frequency38),
      description: description || "No description",
    };

    try {
      // Get Firebase ID token
      const user = auth.currentUser;
      if (!user) {
        alert("User is not authenticated.");
        return;
      }

      const token = await user.getIdToken(); // Retrieve the JWT token

      // Send request with token in headers
      await axios.post(
        "https://radiofreq-production.up.railway.app/api/frequencies",
        newFrequency,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token to request
          },
        }
      );

      alert("Frequency added successfully!");
      setFrequency37("");
      setFrequency38("");
      setDescription("");
    } catch (error) {
      console.error("Error adding frequency:", error);
      alert("Failed to add frequency.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center">
          Add New Frequency
        </Typography>

        {!isAdmin && (
          <Typography color="error" align="center">
            Only admins can add frequencies.
          </Typography>
        )}

        <TextField
          label="Frequency 37 (5 digits)"
          variant="outlined"
          fullWidth
          value={frequency37}
          onChange={(e) => handleFrequencyChange(e.target.value, setFrequency37, setError37)}
          required
          disabled={!isAdmin}
          error={!!error37}
          helperText={error37 || "Enter 5 digits, will be formatted automatically"}
        />
        <TextField
          label="Frequency 38 (5 digits)"
          variant="outlined"
          fullWidth
          value={frequency38}
          onChange={(e) => handleFrequencyChange(e.target.value, setFrequency38, setError38)}
          required
          disabled={!isAdmin}
          error={!!error38}
          helperText={error38 || "Enter 5 digits, will be formatted automatically"}
        />
        <TextField
          label="Description (optional)"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isAdmin}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isAdmin}
        >
          Add Frequency
        </Button>
      </Box>
    </Container>
  );
};

export default FrequencyForm;
