import RootPortal from '../layouts/RootPortal';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline } from '@mdi/js';
import { useNavigate, useRouteError } from 'react-router-dom';
import { useState } from 'react';

const ErrorModal = (props) => {
  const [modalOpen, setModalOpen] = useState(props.modalOpen);
  const errors = useRouteError();
  const navigate = useNavigate();

  const toggleModal = () => {
    if (modalOpen) {
      navigate(0);
    }
    setModalOpen(!modalOpen);
  };

  if (!modalOpen) return null;

  return (
    <RootPortal modalOpen={modalOpen} onClick={() => toggleModal()}>
      <div
        className={`${props.className} fade-in-bottom bg-secondary mx-auto my-auto flex max-h-dvh-75 max-w-xl flex-col items-center p-4 md:rounded-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon
          className="bg-secondary text-accent"
          path={mdiAlertCircleOutline}
          size={5}
        />
        <h1 className="text-primary bg-secondary sticky top-0 w-full border-b py-4 text-center text-2xl font-semibold md:rounded-t-xl">
          {errors.message}
        </h1>
        <ul className="mt-6 flex list-disc flex-col gap-4 pl-8">
          {errors.errors.map((error, index) => (
            <li key={index} className="text-error text-lg">
              {error}
            </li>
          ))}
        </ul>
      </div>
    </RootPortal>
  );
};

export default ErrorModal;
