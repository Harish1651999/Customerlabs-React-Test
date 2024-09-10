import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import classes from "./SegmentOffcanvas.module.css";
import axios from "axios";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const SegmentOffcanvas = (props) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [addedSchemas, setAddedSchemas] = useState([]);

  // Function to handle adding a new schema dropdown
  const handleAddSchema = () => {
    if (selectedSchema) {
      const schema = availableSchemas.find((s) => s.value === selectedSchema);
      setAddedSchemas([...addedSchemas, schema]);

      // Remove selected schema from available options
      setAvailableSchemas(
        availableSchemas.filter((s) => s.value !== selectedSchema)
      );

      // Reset the selected schema
      setSelectedSchema("");
    }
  };

  // Function to handle schema change in the added dropdowns
  const handleSchemaChange = (index, value) => {
    const newSchemas = [...addedSchemas];
    const oldSchema = newSchemas[index];

    // Update the schema at the specific index
    newSchemas[index] = availableSchemas.find((s) => s.value === value);

    // Update available schemas: Add the old schema back and remove the new one
    setAvailableSchemas([
      ...availableSchemas.filter((s) => s.value !== value),
      oldSchema,
    ]);

    setAddedSchemas(newSchemas);
  };

  // Function to handle saving the segment
  const handleSaveSegment = async () => {
    debugger;
    const segmentData = {
      segment_name: segmentName,
      schema: addedSchemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    // Get base URL from environment variables
    const baseURL = import.meta.env.VITE_REACT_API_URL;

    try {
      // Make POST request to the server
      const response = await axios.post(baseURL, segmentData);
      console.log("Response from server:", response.data);
      alert("Segment saved successfully!");

      // Reset form and close offcanvas
      handleCancel();
    } catch (error) {
      console.error("Error saving segment:", error);
      alert("Failed to save segment. Please try again.");
    }
  };

  const handleCancel = () => {
    setSegmentName("");
    setAddedSchemas([]);
    setAvailableSchemas(schemaOptions);
    setSelectedSchema("");
  };

  return (
    <Offcanvas {...props}>
      <Offcanvas.Header className="bg-info">
        <Offcanvas.Title>
          <i
            onClick={() => props.onHide()}
            className="bi bi-chevron-left cursor-pointer"
          ></i>{" "}
          Saving Segment{" "}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="py-3">
          {/* Segment Name */}
          <Form className="mb-4">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter the Name of the Segment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of the segment"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Group>
          </Form>

          <p>
            To save your segment, you need to add the schemas to build the
            query.
          </p>

          {/* Blue Box to Display Added Schemas */}
          {addedSchemas.length > 0 && (
            <div
              className={`px-3 py-1 border border-2 border-info rounded text-white mb-3`}
            >
              {addedSchemas.map((schema, index) => (
                <Form.Select
                  key={index}
                  value={schema.value}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                  className="my-3"
                >
                  <option value={schema.value}>{schema.label}</option>
                  {availableSchemas.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              ))}
            </div>
          )}

          {/* Dropdown for Schema Selection */}
          <Form.Select
            className="mb-3"
            aria-label="Default select example"
            value={selectedSchema}
            onChange={(e) => setSelectedSchema(e.target.value)}
          >
            <option value="" disabled>
              Add schema to segment
            </option>
            {availableSchemas.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>

          {/* Button to Add Schema */}
          <Button
            variant="link"
            className="text-info"
            onClick={handleAddSchema}
          >
            + Add new schema
          </Button>
        </div>
      </Offcanvas.Body>
      {/* Footer with Save and Cancel Buttons */}
      <div className={`px-3 py-4 ${classes["offcanvas-footer"]}`}>
        <Button variant="success" onClick={handleSaveSegment}>
          Save the segment
        </Button>{" "}
        <Button
          variant="light"
          className="text-danger ms-3"
          onClick={handleCancel}
        >
          Cancel & Reset
        </Button>{" "}
      </div>
    </Offcanvas>
  );
};

export default SegmentOffcanvas;
