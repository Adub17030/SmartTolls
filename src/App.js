import React, { useState } from "react";
import Switch from "react-switch";
import MapView from "./MapView";
import ezpass from "./ezpass.png";
import goodtogo from "./goodtogo.png";
import "./App.css";

const App = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [showPath, setShowPath] = useState(false);
  const [showTolls, setShowTolls] = useState(false);
  const [modalContent, setModalContent] = useState(null); // For modal state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedRoute, setSelectedRoute] = useState(null); // Track selected route

  const availablePaymentTypes = ["Cash", "Card", "Camera"];
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState(
    availablePaymentTypes
  );

  const blueTollCost = 6.5;
  const blueTime = 25;

  const redTollCost = 3;
  const redTime = 50;

  const routes = [
    {
      name: "Route A",
      paymentTags: ["Camera", "Card"],
      image: goodtogo,
      cost: blueTollCost,
    },
    {
      name: "Route B",
      paymentTags: ["Cash", "Card"],
      image: ezpass,
      cost: redTollCost,
    },
  ];

  // State to track selected tolls in modal
  const [selectedTolls, setSelectedTolls] = useState([
    { name: "Evergreen Bridge", savedTime: 16, cost: 4.0, selected: true },
    { name: "Bellevue Turnpike", savedTime: 5, cost: 2.5, selected: true },
  ]);

  // Handler to toggle toll selection
  const handleTollSelection = (index) => {
    setSelectedTolls((prevTolls) =>
      prevTolls.map((toll, i) =>
        i === index ? { ...toll, selected: !toll.selected } : toll
      )
    );
  };

  // Calculate total savings and time adjustment
  const calculateSavings = () => {
    const selected = selectedTolls.filter((toll) => toll.selected);
    const totalCost = selected.reduce((sum, toll) => sum + toll.cost, 0);
    const totalTime = selected.reduce((sum, toll) => sum + toll.savedTime, 0);

    const avoidedTolls = selectedTolls.length - selected.length;
    const savings =
      selectedTolls.reduce((sum, toll) => sum + toll.cost, 0) - totalCost;
    const timeAdjustment = 21 - totalTime; // Example: assume 59 min total time without tolls

    return { avoidedTolls, savings: savings.toFixed(2), timeAdjustment };
  };

  const { avoidedTolls, savings, timeAdjustment } = calculateSavings();

  const handleGetRoute = () => {
    if (startLocation && endLocation) {
      setShowPath(true);
      alert(`Calculating route from ${startLocation} to ${endLocation}`);
    } else {
      alert("Please enter both starting and ending locations.");
    }
  };

  const handleStartRoute = () => {
    alert(`Starting route from ${startLocation} to ${endLocation}`);
  };

  const handleToggleTolls = (checked) => {
    setShowTolls(checked);
  };

  const handlePaymentTypeChange = (type) => {
    setSelectedPaymentTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleRouteSelection = (routeName) => {
    setSelectedRoute(routeName);
  };

  return (
    <div className="iphone-view">
      <div className="app">
        {/* Header Section */}
        <header className="header">
          <div className="input-container">
            <span className="input-icon">📍</span>
            <input
              type="text"
              placeholder="Starting location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>
          <div className="input-container">
            <span className="input-icon">🏁</span>
            <input
              type="text"
              placeholder="Ending location"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
          </div>

          <div className="transport-buttons">
            <button onClick={handleGetRoute} className="circular-button">
              🚗
            </button>
            <button className="circular-button">🚶</button>
            <button className="circular-button">🚌</button>
            <button className="circular-button">🚴</button>
          </div>
        </header>

        {/* Map Section */}
        <MapView
          showPath={showPath}
          showTolls={showTolls}
          blueTollCost={blueTollCost}
          blueTime={blueTime}
          redTollCost={redTollCost}
          redTime={redTime}
        />

        {/* Trip Summary Section */}
        <footer className="trip-summary">
          <p
            style={{
              fontWeight: "bold",
              fontSize: "17px",
              marginBottom: "10px",
            }}
          >
            Trip Summary:{" "}
            {startLocation && endLocation
              ? `${startLocation} to ${endLocation}`
              : "Enter locations to see summary"}
          </p>
          {showTolls && (
            <div className="details-container">
              {/* Payment Type Selection */}
              <div className="payment-selection">
                <p style={{ color: "#8E1EED", fontWeight: "bold" }}>
                  Filter Payment Type
                </p>
                {["Cash", "Card", "Camera"].map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      value={type}
                      checked={selectedPaymentTypes.includes(type)}
                      onChange={() => handlePaymentTypeChange(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>

              {/* Filtered Routes */}
              <div className="route-details">
                {routes
                  .filter((route) =>
                    route.paymentTags.some((tag) =>
                      selectedPaymentTypes.includes(tag)
                    )
                  )
                  .map((route, index) => (
                    <div
                      key={index}
                      className="route-row"
                      onClick={() => handleRouteSelection(route.name)}
                      style={{
                        border:
                          selectedRoute === route.name
                            ? "2px solid black"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",
                        margin: "5px 0",
                        cursor: "pointer",
                      }}
                    >
                      <p
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row selection when clicking on route name
                          openModal(`Details for ${route.name}`);
                        }}
                        style={{
                          textDecoration: "underline",
                          fontWeight: "bold",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      >
                        {route.name}
                      </p>
                      <div style={{ color: "green", fontWeight: "bold" }}>
                        ${route.cost}
                      </div>
                      <div className="tags">
                        {route.paymentTags.map((tag) => (
                          <span key={tag} className="payment-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div>
                        <img
                          src={route.image}
                          alt={`${route.name} image`}
                          style={{ height: "25px" }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <div className="actions">
            <div className="toggle-container">
              <label className="toggle-label">Show Toll Options</label>
              <Switch
                onChange={handleToggleTolls}
                checked={showTolls}
                onColor="#007bff"
                offColor="#ccc"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={48}
              />
            </div>
            <button onClick={handleStartRoute}>Start Route</button>
          </div>
        </footer>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent click on modal from closing it
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "450px",
              textAlign: "left",
              zIndex: 10000,
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
              Toll Cost Breakdown
            </h2>
            <div style={{ marginTop: "15px" }}>
              {selectedTolls.map((toll, index) => (
                <div
                  key={toll.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={toll.selected}
                    onChange={() => handleTollSelection(index)}
                    style={{ marginRight: "10px" }}
                  />
                  <div>
                    <strong>{toll.name}</strong> saves {toll.savedTime} min and
                    costs <strong>${toll.cost.toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: "15px",
                color: "green",
                fontWeight: "bold",
              }}
            >
              New route avoids {avoidedTolls} tolls, saving ${savings}.
              Estimated time: +{timeAdjustment} min.
            </p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
