import React from 'react';

export default () => {
  const liStyle = { marginBottom: '10px', marginLeft: '5px' };
  return (
    <div className="container">
      <ul>
        <li style={liStyle}>
          <span className="text-headline">Stubs</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/uiKit">
            UiKit
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Auth pages</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/signUp">
            Sign Up
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/logIn">
            Log In
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/resetPassword">
            Reset Password
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/createNewPassword">
            Create New Password
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/EmailConfirmModal">
            Email Confirm Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/EmailConfirmExpiredModal">
            Email Confirm Expired Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/PasswordRecoveryModal">
            Password Recovery Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/auth/PasswordExpiredModal">
            Password Recovery Link Expired Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Account page</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/account">
            Account
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/account/ChangeEmailModal">
            Change Email Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/account/ChangePasswordModal">
            Change Password Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/account/DeactivateAccountModal">
            Deactivate Account Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/account/CreateSignatureModal">
            Create Signature Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/account/ImageUploadErrorModal">
            Image Upload Error Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">New Listing pages</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing">
            Personal Information
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/CamperDetails">
            Listing Camper Details Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/Amenities">
            Amenities Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/Insurance">
            Insurance Protection Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/ListingDetails">
            Listing Details Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/ListingPhotos">
            Listing Details Photos Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/ListingDetailsMap">
            Listing Details Map Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/Pricing">
            Pricing Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/TripFees">
            Pricing Page - Trip Fees
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/Policies">
            Policies Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/AddNewListingModal">
            Add New Listing Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listing/IDVerificationModal">
            ID Verification Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Explore My Listing</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/exploreMyListing/Empty">
            Explore My Listing Empty page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/exploreMyListing">
            Explore My Listing page
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/CalendarMasterView"
          >
            Calendar - Master View
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/CalendarListingView"
          >
            Calendar - Listing View
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/PublishCamperModal"
          >
            Publish Camper Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/RemoveCamperModal"
          >
            Remove Camper Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/SyncCalendarModal"
          >
            Sync Calendar Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/RemoveCalendarModal"
          >
            Remove Calendar Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/ExportCalendarModal"
          >
            Export Calendar Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/exploreMyListing/ChangeDefaultSettingsModal"
          >
            Change Default Pricing Settings Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Edit Listing pages</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing">
            Edit Listing - Pricing &#38; availability
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/NameAndDescription">
            Edit Listing - Name And Description
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/Photo">
            Edit Listing - Photo
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/Amenities">
            Edit Listing - Amenities
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/editListing/CamperSpecifications"
          >
            Edit Listing - Camper Specification
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/AddOns">
            Edit Listing - Add-Ons
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/Insurance">
            Edit Listing - Insurance
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/Delivery">
            Edit Listing - Delivery
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/TripFees">
            Edit Listing - Trip Fees
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/RulesAndTravel">
            Edit Listing - Rules And Travel
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/BookingPolicies">
            Edit Listing - Booking Policies
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editListing/Documents">
            Edit Listing - Additional Documents
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Renter Profile</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/renterProfile">
            Renter Profile - Empty
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Owner Profile</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/ownerProfile">
            Owner Profile - Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/ownerProfile/AddReviewModal">
            Owner Profile - Add Review Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Bookings</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/booking">
            Bookings Page Main
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/pricingDetailsModal/AddOnsModal"
          >
            Add-ons Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/pricingDetailsModal/OwnerFeesProcessingModal"
          >
            Owner Fees And Processing Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Home Page</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/home">
            Home Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/home/LocationModal">
            Home Page - Location Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Search</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/search/LandingPage">
            City/State Landing Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/search/LandingPageEmpty">
            City/State Landing Page - Empty
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/search/SearchResults">
            Search Results Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/search/SearchResultsEmpty">
            Search Results Page - No Results
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/search/SearchResultsEmptyNoFilters"
          >
            Search Results Page - No Results - Clear filters
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Campervan Details</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/campervanDetails">
            Campervan Details Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/campervanDetails/Skeletons">
            Campervan Details Page - Skeletons
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/campervanDetails/GalleryModal">
            Campervan Details Page - Gallery Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/campervanDetails/ReportReviewModal"
          >
            Campervan Details Page - Report Review Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/campervanDetails/AskQuestionModal"
          >
            Campervan Details Page - Ask Question Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/campervanDetails/AllReviewsModal"
          >
            Campervan Details Page - All Reviews Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Campervan Rentals</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/campervanRentals">
            Campervan Rentals Page
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Privacy Policy</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/policy">
            Privacy Policy Page
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Terms Of Service</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/terms">
            Terms Of Service Page
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Business profile information</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/accountBusiness">
            Business profile information Page
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Key Exchange</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/keyExchange">
            Key Exchange - Photo Page
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/keyExchange/RecommendedPhotoModal"
          >
            Key Exchange - Recommended Photo Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/keyExchange/RenterWalkthrough">
            Key Exchange -Renter Walkthrough Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/keyExchange/FinalCondition">
            Key Exchange -Final Condition Page
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/keyExchange/RenterResponsibilities"
          >
            Key Exchange -Renter Responsibilities Page
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/keyExchange/SignAgreement">
            Key Exchange - Sign departure agreement Page
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/keyExchange/AgreementSignedModal"
          >
            Key Exchange - Departure agreement signed Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/keyExchange/SignRentalContractModal"
          >
            Key Exchange - Sign Rental Contract Modal
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/keyExchange/RentalContractSignedModal"
          >
            Key Exchange - Rental Contract Signed Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">List Your Camper</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/listYourCamper">
            List Your Camper Page
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/listYourCamper/BecomePartnerModal"
          >
            List Your Camper Page - Become a Partner Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Departure Agreement</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/departureAgreement">
            Departure Agreement Page
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Edit Departure Agreement</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/editDepartureAgreement">
            Edit Departure Agreement Page - Photos & Damage
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/editDepartureAgreement/FinalConditionCheck"
          >
            Edit Departure Agreement Page - Final Condition Check
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/editDepartureAgreement/RenterResponsibilities"
          >
            Edit Departure Agreement Page - Renter Responsibilities
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Return Agreement</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/returnAgreement">
            Return Agreement - Photos & Damage
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/returnAgreement/VariableAddonsFees"
          >
            Return Agreement - Variable Addons Fees
          </a>
        </li>
        <li style={liStyle}>
          <a
            className="main-link"
            href="/stubs/returnAgreement/ReturnAgreementModal"
          >
            Return Agreement - Return Agreement Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">Checkout</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/CheckoutStep1">
            Checkout - Step 1
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/CheckoutStep2">
            Checkout - Step 2
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/CheckoutStep3">
            Checkout - Step 3
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/CheckoutStep4">
            Checkout - Step 4
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/BookedDatesModal">
            Checkout - Booked Dates Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/PaymentFailedModal">
            Checkout - Payment Failed Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/LicenseFailedModal">
            Checkout - License Failed Modal
          </a>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/checkout/CheckoutDoneModal">
            Checkout - Done Modal
          </a>
        </li>
        <li style={liStyle}>
          <span className="text-subheader">404 page</span>
        </li>
        <li style={liStyle}>
          <a className="main-link" href="/stubs/404page">
            404 page
          </a>
        </li>
      </ul>
    </div>
  );
};
