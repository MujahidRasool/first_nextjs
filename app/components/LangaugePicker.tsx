'use client'
import React, { useState } from "react";

type Symptoms = {
    [key: string]: string;
};

const symptoms: Symptoms =  {
  "0": "itching",
  "1": "skin_rash",
  "2": "nodal_skin_eruptions",
  "3": "continuous_sneezing",
  "4": "shivering",
  "5": "chills",
  "6": "joint_pain",
  "7": "stomach_pain",
  "8": "acidity",
  "9": "ulcers_on_tongue",
  "10": "muscle_wasting",
  "11": "vomiting",
  "12": "burning_micturition",
  "13": "spotting_urination",
  "14": "fatigue",
  "15": "weight_gain",
  "16": "anxiety",
  "17": "cold_hands_and_feets",
  "18": "mood_swings",
  "19": "weight_loss",
  "20": "restlessness",
  "21": "lethargy",
  "22": "patches_in_throat",
  "23": "irregular_sugar_level",
  "24": "cough",
  "25": "high_fever",
  "26": "sunken_eyes",
  "27": "breathlessness",
  "28": "sweating",
  "29": "dehydration",
  "30": "indigestion",
  "31": "headache",
  "32": "yellowish_skin",
  "33": "dark_urine",
  "34": "nausea",
  "35": "loss_of_appetite",
  "36": "pain_behind_the_eyes",
  "37": "back_pain",
  "38": "constipation",
  "39": "abdominal_pain",
  "40": "diarrhoea",
  "41": "mild_fever",
  "42": "yellow_urine",
  "43": "yellowing_of_eyes",
  "44": "acute_liver_failure",
  "45": "fluid_overload",
  "46": "swelling_of_stomach",
  "47": "swelled_lymph_nodes",
  "48": "malaise",
  "49": "blurred_and_distorted_vision",
  "50": "phlegm",
  "51": "throat_irritation",
  "52": "redness_of_eyes",
  "53": "sinus_pressure",
  "54": "runny_nose",
  "55": "congestion",
  "56": "chest_pain",
  "57": "weakness_in_limbs",
  "58": "fast_heart_rate",
  "59": "pain_during_bowel_movements",
  "60": "pain_in_anal_region",
  "61": "bloody_stool",
  "62": "irritation_in_anus",
  "63": "neck_pain",
  "64": "dizziness",
  "65": "cramps",
  "66": "bruising",
  "67": "obesity",
  "68": "swollen_legs",
  "69": "swollen_blood_vessels",
  "70": "puffy_face_and_eyes",
  "71": "enlarged_thyroid",
  "72": "brittle_nails",
  "73": "swollen_extremeties",
  "74": "excessive_hunger",
  "75": "extra_marital_contacts",
  "76": "drying_and_tingling_lips",
  "77": "slurred_speech",
  "78": "knee_pain",
  "79": "hip_joint_pain",
  "80": "muscle_weakness",
  "81": "stiff_neck",
  "82": "swelling_joints",
  "83": "movement_stiffness",
  "84": "spinning_movements",
  "85": "loss_of_balance",
  "86": "unsteadiness",
  "87": "weakness_of_one_body_side",
  "88": "loss_of_smell",
  "89": "bladder_discomfort",
  "90": "foul_smell_ofurine",
  "91": "continuous_feel_of_urine",
  "92": "passage_of_gases",
  "93": "internal_itching",
  "94": "toxic_look_(typhos)",
  "95": "depression",
  "96": "irritability",
  "97": "muscle_pain",
  "98": "altered_sensorium",
  "99": "red_spots_over_body",
  "100": "belly_pain",
  "101": "abnormal_menstruation",
  "102": "dischromic_patches",
  "103": "watering_from_eyes",
  "104": "increased_appetite",
  "105": "polyuria",
  "106": "family_history",
  "107": "mucoid_sputum",
  "108": "rusty_sputum",
  "109": "lack_of_concentration",
  "110": "visual_disturbances",
  "111": "receiving_blood_transfusion",
  "112": "receiving_unsterile_injections",
  "113": "coma",
  "114": "stomach_bleeding",
  "115": "distention_of_abdomen",
  "116": "history_of_alcohol_consumption",
  "117": "fluid_overload",
  "118": "blood_in_sputum",
  "119": "prominent_veins_on_calf",
  "120": "palpitations",
  "121": "painful_walking",
  "122": "pus_filled_pimples",
  "123": "blackheads",
  "124": "scurring",
  "125": "skin_peeling",
  "126": "silver_like_dusting",
  "127": "small_dents_in_nails",
  "128": "inflammatory_nails",
  "129": "blister",
  "130": "red_sore_around_nose",
  "131": "yellow_crust_ooze",
  "132": "prognosis"
}



// Convert snake_case to Sentence Case
const toSentenceCase = (input: string): string => {
    return input
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function PickerSym() {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [predictionResult, setPredictionResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // State for progress bar

    const toggleSymptom = (key: string) => {
        if (selectedSymptoms.includes(key)) {
            // Remove symptom if it's already selected
            setSelectedSymptoms((prevSelected) =>
                prevSelected.filter((symptom) => symptom !== key)
            );
            setErrorMessage(null);
        } else {
            // Limit selection to 17 symptoms
            if (selectedSymptoms.length < 17) {
                setSelectedSymptoms((prevSelected) => [...prevSelected, key]);
                setErrorMessage(null);
            } else {
                setErrorMessage("You can select a maximum of 17 symptoms.");
            }
        }
    };

    const clearAllSymptoms = () => {
        setSelectedSymptoms([]);
        setErrorMessage(null);
        setPredictionResult(null);
    };

    const predictDisease = async () => {
        // Check if at least 3 symptoms are selected
        if (selectedSymptoms.length < 3) {
            setErrorMessage("Please select at least 3 symptoms for prediction.");
            return;
        }

        // Format selected symptoms as an indexed object
        const formattedSymptoms = selectedSymptoms.reduce((acc, key, index) => {
            acc[index.toString()] = symptoms[key];
            return acc;
        }, {} as { [key: string]: string });

        setLoading(true); // Show progress bar

        try {
            console.log(JSON.stringify({ data: formattedSymptoms }));
            const response = await fetch("https://mujahid-9eb65634c95c.herokuapp.com/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: formattedSymptoms }),
            });

            if (!response.ok) throw new Error("Failed to fetch prediction");

            const result = await response.json();
            console.log(result);
            setPredictionResult(result[0]?.split(': ')[1] || "No prediction available.");
        } catch (error) {
            console.error("Error predicting disease:", error);
            setPredictionResult("Error: Unable to fetch prediction.");
        } finally {
            setLoading(false); // Hide progress bar after prediction
        }
    };

    // Filter symptoms based on search term
    const filteredSymptoms = Object.keys(symptoms).filter((key) =>
        toSentenceCase(symptoms[key]).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
            <header className="bg-blue-700 text-white py-4 shadow-md">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl font-bold">Health Symptom Checker</h1>
                    <p className="text-lg mt-2">Quickly check your symptoms and predict possible diseases</p>
                </div>
            </header>

            <main className="flex-grow p-6">
                <div className="container mx-auto max-w-7xl bg-white rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                        {/* Symptoms List with Search Bar */}
                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Symptoms</h2>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search symptoms..."
                                className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex flex-wrap gap-4">
                                {filteredSymptoms.map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => toggleSymptom(key)}
                                        className={`px-6 py-3 rounded-full text-sm font-medium ${selectedSymptoms.includes(key)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-800 hover:bg-blue-300"
                                            } transition`}
                                    >
                                        {toSentenceCase(symptoms[key])}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Symptoms */}
                        <div className="lg:col-span-1">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Symptoms</h2>
                            {errorMessage && (
                                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                            )}
                            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                                {selectedSymptoms.length > 0 ? (
                                    <ul className="list-decimal list-inside space-y-2">
                                        {selectedSymptoms.map((key) => (
                                            <li key={key} className="text-gray-600">
                                                {toSentenceCase(symptoms[key])}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No symptoms selected yet.</p>
                                )}
                                <button
                                    onClick={clearAllSymptoms}
                                    className="text-red-500 mt-4 underline text-sm"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>

                        {/* Action & Prediction */}
                        <div className="lg:col-span-1 flex flex-col items-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Take Action</h2>
                            <button
                                onClick={predictDisease}
                                className="px-8 py-4 bg-green-600 text-white rounded-full text-xl font-semibold hover:bg-green-700 transition w-full"
                            >
                                Predict Disease
                            </button>

                            {/* Progress Bar */}
                            {loading && (
                                <div className="mt-6 w-full">
                                    <div className="w-full bg-gray-200 rounded-full">
                                        <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                                    </div>
                                    <p className="text-gray-500 mt-2 text-center">Please wait... Predicting your disease.</p>
                                </div>
                            )}

                            {/* Prediction Result */}
                            {predictionResult && (
                                <div className="mt-8 p-6 border border-gray-300 rounded-lg shadow-md bg-blue-50">
                                    <h3 className="text-2xl text-blue-600 mb-4">Prediction Result</h3>
                                    <p className="text-xl font-semibold text-gray-800">
                                        {predictionResult ? (
                                            <span className="text-green-600">{toSentenceCase(predictionResult)}</span>
                                        ) : (
                                            <span className="text-red-600">We could not predict the disease. Please try again.</span>
                                        )}
                                    </p>
                                    <span className="ml-4">
                                        {predictionResult ? (
                                            <i className="fas fa-check-circle text-green-600"></i>
                                        ) : (
                                            <i className="fas fa-times-circle text-red-600"></i>
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-blue-700 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Health Symptom Checker | All Rights Reserved</p>
                    <p>@ Developed by Mujahid Rasool</p>

                </div>
            </footer>
        </div>
    );
}
