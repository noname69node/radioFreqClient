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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const newFrequency = {
      frequency_37: frequency37,
      frequency_38: frequency38,
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
      await axios.post("http://localhost:5000/api/frequencies", newFrequency, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token to request
        },
      });

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
          label="Frequency 37"
          variant="outlined"
          fullWidth
          value={frequency37}
          onChange={(e) => setFrequency37(e.target.value)}
          required
          disabled={!isAdmin}
        />
        <TextField
          label="Frequency 38"
          variant="outlined"
          fullWidth
          value={frequency38}
          onChange={(e) => setFrequency38(e.target.value)}
          required
          disabled={!isAdmin}
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
