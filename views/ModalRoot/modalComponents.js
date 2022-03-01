import ConfirmModal from 'views/shared/ConfirmModal';
import PasswordRecoveryModal from 'views/ResetPassword/PasswordRecoveryModal';
import EmailTokenExpiredModal from 'views/CreateNewPassword/EmailTokenExpiredModal';
import RemoveSignatureModal from 'views/shared/RemoveSignatureModal';
import InfoModal from 'views/shared/InfoModal';
import LeavePageModal from 'views/shared/LeavePageModal';
import IdVerificationModal from 'views/AddNewCamper/IdVerificationModal';
import UploadErrorModal from 'views/AddNewCamper/Photos/UploadErrorModal';
import ExportModal from 'views/Dashboard/Calendar/ExternalCalendarsFooter/ExportCalendarSection/ExportModal';
import ImportModal from 'views/Dashboard/Calendar/ExternalCalendarsFooter/ImportCalendarSection/ImportModal';
import RemoveModal from 'views/Dashboard/Calendar/ExternalCalendarsFooter/ImportCalendarSection/ImportList/RemoveModal';
import EditModal from 'views/Dashboard/Calendar/ExternalCalendarsFooter/ImportCalendarSection/ImportList/EditModal';
import CamperStatusModal from 'views/Dashboard/AllCampers/CamperCard/CamperStatusModal';
import VerificationModal from 'views/Dashboard/EditCamper/Policies/VerificationModal';
import RemoveQuestionModal from 'views/Dashboard/EditCamper/AdditionalDocuments/RemoveQuestionModal';
import RemoveDocumentModal from 'views/Dashboard/EditCamper/AdditionalDocuments/RemoveDocumentModal';
import RemoveCustomAddonModal from 'views/Dashboard/EditCamper/Addons/RemoveCustomAddonModal';
import CamperDetailsPhotosModal from 'views/CamperDetails/Photos/PhotosModal';
import AskQuestionModal from 'views/CamperDetails/OwnerProfile/AskQuestionModal';
import FeesAndProcessingModal from 'views/CamperDetails/CamperPrices/FeesAndProcessingModal';

const MODAL_COMPONENTS = {
  ASK_QUESTION_MODAL: AskQuestionModal,
  CALENDAR_EXPORT_MODAL: ExportModal,
  CALENDAR_IMPORT_EDIT_MODAL: EditModal,
  CALENDAR_IMPORT_MODAL: ImportModal,
  CALENDAR_IMPORT_REMOVE_MODAL: RemoveModal,
  CAMPER_DETAILS_PHOTOS_MODAL: CamperDetailsPhotosModal,
  CAMPER_STATUS_MODAL: CamperStatusModal,
  CONFIRM_MODAL: ConfirmModal,
  EDIT_POLICIES_ID_VERIFICATION_MODAL: VerificationModal,
  EMAIL_TOKEN_EXPIRED_MODAL: EmailTokenExpiredModal,
  ID_VERIFICATION_MODAL: IdVerificationModal,
  INFO_MODAL: InfoModal,
  LEAVE_PAGE_MODAL: LeavePageModal,
  PASSWORD_RECOVERY_MODAL: PasswordRecoveryModal,
  REMOVE_CUSTOM_ADDON_MODAL: RemoveCustomAddonModal,
  REMOVE_DOCUMENT_MODAL: RemoveDocumentModal,
  REMOVE_QUESTION_MODAL: RemoveQuestionModal,
  REMOVE_SIGNATURE_MODAL: RemoveSignatureModal,
  UPLOAD_ERROR_MODAL: UploadErrorModal,
  CAMPER_FEES_AND_PROCESSING_MODAL: FeesAndProcessingModal,
};

export default MODAL_COMPONENTS;
