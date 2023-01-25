import styles from './assign-ticket.module.css';
import { Formik, Field, Form, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { User, Ticket } from '@acme/shared-models';

/* eslint-disable-next-line */
export interface AssignTicketProps {
  users: User[];
  tickets: Ticket[];
}

export function AssignTicket(atprops: AssignTicketProps) {
  return (
    <div className={styles['container']}>
      <h2 className="border-b-2 border-black mb-4">Add a Ticket</h2>
      <Formik 
        initialValues={{ description: '', assigneeId: 0 }}
        validationSchema={Yup.object({
          description: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .required('Required'),
          assigneeId: Yup.number()
            .required('Required')
            .min(1, 'Must be a valid user')
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
                // atprops.setTickets([...atprops.tickets, data]);
                console.log('Success:', data);
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props: FormikProps<any>) => (
          <Form className="flex flex-col gap-2">
            <label htmlFor="description">Issue</label>
            <Field name="description" type="text" className="border-2" />
            {props.errors['description'] && props.touched['description'] ? (
              <div className="text-sm text-red-600">{props.errors['description'] as any}</div>
            ) : null}

            <label htmlFor="assigneeId">Assignee</label>
            <Field as="select" name="assigneeId" id="assigneeId" className="border-2">
              <option value="0">[Select a user]</option>
              {
                atprops.users && atprops.users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))
              }
            </Field>
            {props.errors['description'] && props.touched['description'] ? (
              <div className="text-sm text-red-600">{props.errors['description'] as any}</div>
            ) : null}

            <button type="submit" className="border-2">Add</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AssignTicket;
