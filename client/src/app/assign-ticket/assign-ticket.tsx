import styles from './assign-ticket.module.css';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { User, Ticket } from '@acme/shared-models';
import { useEffect, useState } from 'react';
import { __values } from 'tslib';

/* eslint-disable-next-line */
export interface AssignTicketProps {
  users: User[];
  tickets: Ticket[];
}

export function AssignTicket(atprops: AssignTicketProps) {
  const params = useParams();
  const [ticket, setTicket] = useState<Ticket>({ id: 0, description: '', assigneeId: 0, completed: false});
  const [selectedOption, setSelectedOption] = useState<number>(0);

  useEffect(() => {
    async function fetchTicket() {
      fetch(`/api/tickets/${params['id']}`)
        .then(response => response.json())
        .then(data => {
          setTicket(data);
          setSelectedOption(data.assigneeId);
        })
        .catch(error => console.log(error));
    }

    fetchTicket();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['container']}>
      <h2 className="border-b-2 border-black mb-4">Add a Ticket</h2>
      <Formik 
        initialValues={{ assigneeId: selectedOption }}
        validationSchema={Yup.object({
          assigneeId: Yup.number()
            .required('Required')
            .min(1, 'Must be a valid user')
        })}
        onSubmit={(values, { setSubmitting }) => {
          fetch(`/api/tickets/${params['id']}/assign/${values.assigneeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
              },
              body: ''
            })
            .then((response) => {
              if ( 204 === response.status ) {
                setSubmitting(false);
                window.location.href = '/';
              } else {
                throw new Error('Something went wrong');
              }
            });
        }}
      >
        {(props: FormikProps<any>) => (
          <Form className="flex flex-col gap-2">
            <label htmlFor="assigneeId">Assignee</label>
            <Field 
              as="select" 
              name="assigneeId" 
              id="assigneeId" 
              className="border-2" 
              value={selectedOption} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.handleChange(e);
                setSelectedOption(Number(e.currentTarget.value));
              }}
              >
              <option value="0">[Select a user]</option>
              {
                atprops.users && atprops.users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))
              }
            </Field>

            <button type="submit" className="border-2">Assign</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AssignTicket;
