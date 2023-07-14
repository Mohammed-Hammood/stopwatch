import PaginationForm from "./pagination-form";
import TimerSettingsForm from "./settings";
import { FormsNames, ModalTypes } from 'types'
import AddEditTimerForm from "./add-edit-timer";
import DeleteTimerForm from "./delete-timer";
import ResetTimerForm from "./reset-timer";


type FormsTypes = {
    [key in FormsNames]: JSX.Element
}

interface Props {
    modal: ModalTypes
    setModal: (modal: ModalTypes) => void;
    props: any
}

export default function Forms(props: Props): JSX.Element | null {
    const { form } = props.modal;
    const forms: FormsTypes = {
        "pagination": <PaginationForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "add-edit-timer": <AddEditTimerForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "delete-timer": <DeleteTimerForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "reset-timer": <ResetTimerForm {...props.props} setModal={props.setModal} modal={props.modal} />,
        "timer-settings": <TimerSettingsForm {...props.props} setModal={props.setModal} modal={props.modal} />,
    }
    if (forms && forms.hasOwnProperty(form)) return forms[form];
    return null;
}