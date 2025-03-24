import React, { useState, useEffect } from 'react';

const AboutUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    // Fetch CSRF token from cookies
    useEffect(() => {
        const getCsrfToken = () => {
            const cookieValue = document.cookie
                .split('; ')
                .find((row) => row.startsWith('csrftoken='))
                ?.split('=')[1];
            setCsrfToken(cookieValue || '');
        };
        getCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields
        if (!name || !email || !message) {
            setStatus('Please fill out all fields.');
            return;
        }
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        

        // Send the email via the backend
        try {
            const response = await fetch('http://127.0.0.1:8000/send-email/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            setStatus('Failed to connect to the server.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
                    About Us
                </h1>

                {/* About Us Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <p className="text-lg text-gray-700 mb-6">
                        Welcome to <strong>KChar</strong>, a pioneering project dedicated to advancing the recognition and preservation of the Kurdish language through cutting-edge technology. The Kurdish language, spoken by over 30 million people worldwide, holds immense cultural and historical significance. Yet, it remains underrepresented in the fields of Natural Language Processing (NLP) and Optical Character Recognition (OCR).
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        While significant progress has been made in OCR systems for languages like English and Arabic, Kurdish has been largely overlooked. This gap in technology not only limits the accessibility of Kurdish texts in the digital world but also hinders the preservation of the language for future generations. At KChar, we aim to change this narrative by developing the first-ever Kurdish character recognition model.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        Our project addresses the unique challenges of Kurdish script recognition, such as connected letters, diacritics, and the lack of publicly available datasets. By leveraging deep learning techniques and creating a dedicated dataset, we are building a robust system capable of recognizing both standard and handwritten Kurdish text. This innovation will pave the way for future Kurdish OCR technologies, enabling the digitization of Kurdish literature, historical documents, and everyday texts.
                    </p>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-700">
                            At KChar, our mission is to empower the Kurdish-speaking community by bridging the technological gap in language processing. We strive to create tools that not only recognize Kurdish characters with high accuracy but also contribute to the preservation and dissemination of the Kurdish language in the digital age. By making Kurdish texts accessible and searchable online, we aim to celebrate and safeguard this rich linguistic heritage for generations to come.
                        </p>
                    </div>
                </div>

                {/* Contact Us Section */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                        Contact Us
                    </h2>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                rows="5"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Send Message
                        </button>
                        {status && (
                            <p className="mt-4 text-center text-green-600">{status}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;