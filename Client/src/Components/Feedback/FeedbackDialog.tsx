import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Rating,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Stack,
    IconButton,
    Fade,
    Alert,
} from '@mui/material';
import {
    Close as CloseIcon,
    Send as SendIcon,
    Feedback as FeedbackIcon,
    Star as StarIcon,
} from '@mui/icons-material';

interface FeedbackDialogProps {
    open: boolean;
    onClose: () => void;
}

interface FeedbackData {
    rating: number | null;
    category: string;
    subject: string;
    message: string;
    userType: string;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onClose }) => {
    const [feedback, setFeedback] = useState<FeedbackData>({
        rating: null,
        category: '',
        subject: '',
        message: '',
        userType: 'general',
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        'Design & User Interface',
        'Performance & Speed',
        'Navigation & Usability',
        'Accessibility',
        'Features & Functionality',
        'Bug Report',
        'General Feedback',
        'Suggestion for Improvement',
    ];

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        // Simulate API call - replace with actual feedback service
        try {
            // Create email content
            const emailBody = `
New Feedback Received:

Rating: ${feedback.rating}/5 stars
Category: ${feedback.category}
Subject: ${feedback.subject}
User Type: ${feedback.userType}

Message:
${feedback.message}

---
Submitted from: Coupon System Redesign
Date: ${new Date().toLocaleString()}
            `;

            // Create mailto link
            const mailtoLink = `mailto:worko.itegev@gmail.com?subject=Coupon System Feedback: ${feedback.subject}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.open(mailtoLink, '_blank');
            
            // Mark as submitted
            setSubmitted(true);
            
            // Reset form after delay
            setTimeout(() => {
                setFeedback({
                    rating: null,
                    category: '',
                    subject: '',
                    message: '',
                    userType: 'general',
                });
                setSubmitted(false);
                onClose();
            }, 2000);
            
        } catch (error) {
            // Error is handled by the error state and display
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
        }
    };

    const isFormValid = feedback.rating !== null && 
                       feedback.category && 
                       feedback.subject.trim() && 
                       feedback.message.trim();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    minHeight: '500px',
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: 'primary.main', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 2,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FeedbackIcon />
                    <Typography variant="h6" component="div">
                        Website Feedback
                    </Typography>
                </Box>
                <IconButton
                    onClick={handleClose}
                    sx={{ color: 'white' }}
                    disabled={isSubmitting}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                {submitted ? (
                    <Fade in>
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Alert severity="success" sx={{ mb: 3 }}>
                                Thank you for your feedback! Your email client should open shortly.
                            </Alert>
                            <Typography variant="h6" gutterBottom>
                                Feedback Submitted Successfully!
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Your feedback helps us improve the user experience.
                            </Typography>
                        </Box>
                    </Fade>
                ) : (
                    <Stack spacing={3}>
                        <Typography variant="body1" color="text.secondary">
                            Help us improve the website redesign! Your feedback about the new desktop-optimized design is valuable to us.
                        </Typography>

                        {/* Rating */}
                        <Box>
                            <Typography component="legend" sx={{ mb: 1, fontWeight: 500 }}>
                                Overall Rating *
                            </Typography>
                            <Rating
                                name="feedback-rating"
                                value={feedback.rating}
                                onChange={(event, newValue) => {
                                    setFeedback({ ...feedback, rating: newValue });
                                }}
                                size="large"
                                icon={<StarIcon fontSize="inherit" />}
                                emptyIcon={<StarIcon fontSize="inherit" />}
                            />
                        </Box>

                        {/* Category */}
                        <FormControl fullWidth>
                            <InputLabel>Feedback Category *</InputLabel>
                            <Select
                                value={feedback.category}
                                label="Feedback Category *"
                                onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Subject */}
                        <TextField
                            fullWidth
                            label="Subject *"
                            value={feedback.subject}
                            onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
                            placeholder="Brief summary of your feedback"
                        />

                        {/* User Type */}
                        <FormControl fullWidth>
                            <InputLabel>I am a...</InputLabel>
                            <Select
                                value={feedback.userType}
                                label="I am a..."
                                onChange={(e) => setFeedback({ ...feedback, userType: e.target.value })}
                            >
                                <MenuItem value="general">General User</MenuItem>
                                <MenuItem value="admin">System Administrator</MenuItem>
                                <MenuItem value="company">Company Representative</MenuItem>
                                <MenuItem value="customer">Customer</MenuItem>
                                <MenuItem value="developer">Developer/Technical User</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Message */}
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Your Feedback *"
                            value={feedback.message}
                            onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                            placeholder="Please share your thoughts about the new design, navigation, accessibility, or any suggestions for improvement..."
                        />

                        {/* Guidelines */}
                        <Box sx={{ backgroundColor: 'grey.50', p: 2, borderRadius: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                What kind of feedback helps us most:
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                <Chip label="Design clarity" size="small" variant="outlined" />
                                <Chip label="Navigation ease" size="small" variant="outlined" />
                                <Chip label="Performance issues" size="small" variant="outlined" />
                                <Chip label="Accessibility concerns" size="small" variant="outlined" />
                                <Chip label="Feature suggestions" size="small" variant="outlined" />
                            </Stack>
                        </Box>
                    </Stack>
                )}
            </DialogContent>

            {!submitted && (
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button 
                        onClick={handleClose} 
                        disabled={isSubmitting}
                        sx={{ mr: 1 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        startIcon={<SendIcon />}
                        disabled={!isFormValid || isSubmitting}
                        sx={{
                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                            },
                        }}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Feedback'}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default FeedbackDialog;
