import styles from './add-ticket-form.module.css';
import { Formik, Field, Form, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { User, Ticket } from '@acme/shared-models';

/* eslint-disable-next-line */
export interface AddTicketFormProps {
  users: User[];
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}

export function AddTicketForm(atfprops: AddTicketFormProps) {

  return (
    <div className={styles['container']}>
      <h2 className="border-b-2 border-black mb-4">Add a Ticket</h2>
      <Formik 
        initialValues={{ description: '', assigneeId: 0 }}
        validationSchema={Yup.object({
          description: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            fetch('/api/tickets', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
              })
              .then((response) => response.json())
              .then((data) => {
                atfprops.setTickets([...atfprops.tickets, data]);
                values.description = '';
                console.log('Success:', data);
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props: FormikProps<any>) => (
          <Form className="grid grid-cols-4 gap-2 auto-cols-min">
            <label htmlFor="description">Issue</label>
            <Field name="description" id="description" type="text" className="border-2 col-span-3" />
            {props.errors['description'] && props.touched['description'] ? (
              <div className="text-sm text-red-600 col-span-3  col-start-2">{props.errors['description'] as any}</div>
            ) : null}

            <button type="submit" className="border-2 col-start-4 text-gray-800 px-4 py-2 rounded hover:bg-gray-900 hover:text-white">Add</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddTicketForm;
