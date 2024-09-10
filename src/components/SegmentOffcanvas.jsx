import React from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import classes from "./SegmentOffcanvas.module.css";

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
          <Form className="mb-4">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter the Name of the Segment</Form.Label>
              <Form.Control type="text" placeholder="Name of the segment" />
            </Form.Group>
          </Form>
          <p>
            To save your segment, you need to add the schemas to build the query
          </p>
          <Form.Select className="mb-3" aria-label="Default select example">
            <option selected disabled>
              Add schema to segment
            </option>
            {schemaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
          <a className="text-info text-decoration-underline">
            + Add new schema
          </a>
        </div>
      </Offcanvas.Body>
      <div className={`px-3 py-4 ${classes["offcanvas-footer"]}`}>
        <Button variant="success">Save the segment</Button>{" "}
        <Button variant="light" className="text-danger ms-3">
          Cancel
        </Button>{" "}
      </div>
    </Offcanvas>
  );
};

export default SegmentOffcanvas;
