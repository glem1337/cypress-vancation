import { Row, Col } from 'antd';

import Header from '../layout/headers/mainHeader/Header';
import { Footer } from '../layout/Footer';

const PrivacyPolicy = () => (
  <>
    <Header unlogged />
    <div className="policy container">
      <Row gutter={24} justify="center">
        <Col>
          <div className="policy-img">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/images/privacy_policy/Banner_mob.png 1x, /images/privacy_policy/Banner_mob@2x.png 2x"
              />
              <source
                media="(min-width: 768px)"
                srcSet="/images/privacy_policy/Banner_desk.png 1x, /images/privacy_policy/Banner_desk@2x.png 2x"
              />
              <img
                src="/images/privacy_policy/Banner_desk.png"
                srcSet="/images/privacy_policy/Banner_desk.png 1x, /images/privacy_policy/Banner_desk@2x.png 2x"
                alt=""
              />
            </picture>
          </div>
        </Col>
        <Col lg={16}>
          <div className="mb-24">
            <h1 className="text-display-jumbo mb-8">Privacy Policy</h1>
            <p className="text-subheader font-400 in-gray-700">
              Last revised: May 26, 2021
            </p>
          </div>
          <p className="text-subheader font-400 text-color-gray mb-24">
            Vancation LLC and its subsidiaries (collectively, “Vancation”, “we”,
            or “us”) care about privacy and want you to be familiar with how we
            collect, use, process, and disclose your personal information. This
            Privacy Policy describes our privacy practices in connection with
            our websites and applications that link to this Privacy Policy
            (collectively, the “Services”) and our offline interactions with you
            in settings where we post this Privacy Policy.
          </p>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              Personal information we collect
            </h2>
            <div className="policy-content">
              <p>
                We collect three categories of personal information - personal
                information you give us; personal information automatically
                collected from your use of the Services; and personal
                information from third-party sources.
              </p>
              <h3 className="policy-content-title">
                Personal information you give us
              </h3>
              <p>
                <span className="in-black font-600">Account data.</span>
                {' '}
                When
                you register for an account with us, we require certain personal
                information to open your account, such as your name, email
                address, and password.
              </p>
              <p>
                <span className="in-black font-600">Profile data.</span>
                {' '}
                We may
                also ask you to provide additional profile information to use
                certain features of the Services which may include street
                addresses, phone numbers, driver’s license number, date of
                issuance and issuing country and/or state, profile photos,
                employer, city, school, biography, and date of birth. Certain
                parts of your profile (like your profile photos, employer, city,
                school, and biography) are part of your public profile page and
                will be publicly visible to others.
              </p>
              <p>
                <span className="in-black font-600">Vehicle data.</span>
                {' '}
                We
                collect information you provide in relation to a vehicle such as
                vehicle listing details, vehicle identification number (VIN),
                availability dates, reviews, and uploaded trip photos.
              </p>
              <p>
                <span className="in-black font-600">Payment data.</span>
                {' '}
                We
                collect your digital payment details, bank account or payment
                card numbers, and transaction information in connection with a
                potential or actual transaction, which may be processed and
                stored by one or more third party payment service providers or
                digital payments companies.
              </p>
              <p>
                <span className="in-black font-600">
                  Identity verification data.
                </span>
                {' '}
                In some instances, we may collect identity verification
                information such as a photograph or scanned copy of a driver’s
                license, passport, national ID card, or payment card, last four
                digits of your Social Security number, social insurance number,
                social media account information, driver’s/motor vehicle record,
                insurance information, or other forms of identification
                information. Where we request that you withhold certain
                information (such as obscuring or redacting aspects of
                identification information), please do so.
              </p>
              <p>
                <span className="in-black font-600">Communications.</span>
                {' '}
                When
                you communicate with Vancation, including via phone, email, or
                chat, or use the Services to communicate with other users, we
                collect information about your communication and any information
                you choose to provide.
              </p>
              <h3 className="policy-content-title">
                Personal information we automatically collect.
              </h3>
              <p>
                <span className="in-black font-600">Usage data.</span>
                {' '}
                We
                collect information about your interactions with the Services,
                such as the pages or other content you view, your searches,
                bookings you have made, how long you spent on a page or screen,
                sites from which you link or browse to in the Services,
                navigation paths between pages or screens, information about
                your activity on a page or screen, access time, duration of
                access, and other actions on the Services.
              </p>
              <p>
                <span className="in-black font-600">Location data.</span>
                {' '}
                When
                you use certain features of the Services, we may collect
                information about your approximate location (e.g., city/town
                associated with your IP address). When you opt in to use our
                location sharing feature, we may collect the precise location
                information of your mobile device. Keep in mind that most mobile
                devices allow you to control or disable the use of location
                services by any application on your mobile device in the
                device’s settings menu.
              </p>
              <p>
                <span className="in-black font-600">Device data.</span>
                {' '}
                We
                collect information about your computer or mobile device, such
                as its operating system type and version number, manufacturer
                and model, browser type, screen resolution, IP address, unique
                device identifiers, or general location information such as
                city, state, or geographic area.
              </p>
              <p>
                <span className="in-black font-600">Trip data.</span>
                {' '}
                We collect
                transactional information related to the trips you take through
                the Services, including the date and time of your trip, amounts
                charged, and other related trip details.
              </p>
              <p>
                <span className="in-black font-600">
                  Cookies and similar technology.
                </span>
                {' '}
                When you access the Services, we (including companies we work
                with) may place small data files on your computer or other
                device. These data files may be cookies, clear gifs, pixel tags,
                e-tags, “Flash cookies”, or other local storage provided by your
                browser or associated applications (collectively “Cookies”). At
                this time, we do not respond to browser ‘Do-Not-Track’ signals.
              </p>
              <h3 className="policy-content-title">
                Personal information we collect from third-party sources.
              </h3>
              <p>
                <span className="in-black font-600">Third-party services</span>
                {' '}
                If you choose to log in to our Services through a third-party
                site or service (e.g., Facebook or Google), the third-party
                service may send us information such as your registration and
                profile information from that service. The information we may
                receive varies by service and is controlled by the relevant
                service. By associating an account managed by a third party with
                your Vancation account and authorizing Vancation to have access
                to this information, you agree that Vancation may collect,
                store, and use this information in accordance with this Privacy
                Policy. We are not responsible for how those third parties use
                and share your information. Please refer to the privacy policies
                of those third parties to understand how they use and share your
                personal information.
              </p>
              <p>
                <span className="in-black font-600">
                  Third-party in-vehicle devices
                </span>
                {' '}
                If your vehicle, or a vehicle you book through the Services,
                includes an in-vehicle device or system operated by a
                third-party service (including vehicle manufacturers) or
                installed by the host, that host or service may record
                information about your use of the car. The host and/or
                third-party service will be solely responsible for its use of
                such information but may disclose such information to Vancation,
                which we will use in accordance with this Privacy Policy.
              </p>
              <p>
                <span className="in-black font-600">
                  Background check services.
                </span>
                {' '}
                To the extent permitted by applicable laws, Vancation may
                collect background information about you from public records,
                background check providers, or other screening services,
                including credit reports and information about criminal
                convictions or from sex offender registries. We may use your
                information, including your full name and date of birth, to
                obtain such reports.
              </p>
              <p>
                <span className="in-black font-600">Other sources.</span>
                {' '}
                To the
                extent permitted by applicable law, we may receive additional
                information about you, such as demographic data, fraud detection
                information, or data from credit bureaus and other third-party
                data providers.
              </p>
              <p>
                We may combine the information about you that we receive from
                third-party sources with other information we have about you.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              How we use your personal information
            </h2>
            <div className="policy-content">
              <p>
                We use, store, and process your personal information to provide
                and improve the Services and for security and safety purposes.
                For example, we may use your information:
              </p>
              <h3 className="policy-content-title">
                To provide the Services, including to:
              </h3>
              <ul className="policy-content-list">
                <li>Provide and operate the Services</li>
                <li>Provide customer support</li>
                <li>
                  Send you service, support, and administrative messages,
                  reminders, technical notices, updates, security alerts, and
                  information requested by you at any telephone number, by
                  placing a voice call or through text (SMS) or email messaging
                </li>
                <li>
                  Facilitate your login to the Services via third-party identity
                  and access management providers, such as Facebook, Google, and
                  Apple
                </li>
                <li>
                  Process transactions and send notices about your transactions
                </li>
                <li>Personalize or customize your user experience</li>
                <li>
                  Enable you to communicate with other Vancation users,
                  including by sending them messages or other information during
                  the booking process
                </li>
                <li>Facilitate your referral invitations</li>
                <li>
                  Send your requests for reviews, for fraud detection and
                  prevention, and for any purpose you authorize at the time of
                  collection
                </li>
                <li>
                  Administer referral programs, rewards, surveys, contests, or
                  other promotional activities or sponsored events in which you
                  participate
                </li>
              </ul>
              <h3 className="policy-content-title">
                For research and development:
              </h3>
              <p>
                We may use your personal information to analyze and improve the
                Services and to develop new products and services, including by
                studying our user demographics of the Services. We may also
                create aggregated, de-identified, or other anonymous data from
                your personal information. We make personal information into
                anonymous data by removing information that makes the data
                personally identifiable to you. We may use this anonymous data
                and share it with third parties for our lawful business
                purposes, including to analyze and improve the Services and
                promote our business.
              </p>
              <h3 className="policy-content-title">
                For marketing and advertising:
              </h3>
              <p>
                We and our third party advertising partners may collect and use
                your personal information for marketing and advertising
                purposes:
              </p>
              <p>
                <span className="in-black font-600">Direct marketing.</span>
                {' '}
                We
                may send you Vancation-related marketing communications as
                permitted by law. You will have the ability to opt-out of our
                marketing and promotional communications by emailing
                support@vancation.com.
              </p>
              <p>
                <span className="in-black font-600">
                  Interest-based advertising.
                </span>
                {' '}
                We may contract with third party advertising and social media
                companies to display ads on the Services and other sites. These
                companies may use cookies and similar technologies to collect
                information about you (including the device data, online
                activity data, and/or geolocation data described above) over
                time across our Services and other sites and services or your
                interaction with our emails, and use that information to serve
                ads that they think will interest you. These ads are known as
                “interest-based advertisements”.
              </p>
              <h3 className="policy-content-title">
                For security and safety, including to:
              </h3>
              <ul className="policy-content-list">
                <li>
                  Verify your identity or authenticate information that you
                  provide, including during account creation and password reset
                  processes
                </li>
                <li>
                  Resolve disputes, collect fees, and troubleshoot problems
                </li>
                <li>
                  Detect, prevent, and/or remediate fraud, abuse, security
                  incidents, or other potentially harmful, prohibited, or
                  illegal activities
                </li>
                <li>
                  Determine your likelihood of getting into an accident or of
                  making an insurance claim, such as by checking your auto
                  insurance score
                </li>
                <li>
                  Using information from your mobile or in-vehicle device to
                  identify unsafe driving behavior, including speeding or harsh
                  braking and acceleration, and to raise awareness regarding
                  such behaviors
                </li>
                <li>
                  Detect, prevent, or remediate violations of and enforce our
                  {' '}
                  <a href="#">Terms of Service</a>
                  .
                </li>
                <li>
                  Manage and protect our information technology infrastructure
                </li>
                <li>Conduct investigations and risk assessments</li>
                <li>
                  Conduct checks against databases and information sources (such
                  as but not limited to public government databases)
                </li>
                <li>Perform creditworthiness and solvency checks</li>
              </ul>
              <h3 className="policy-content-title">To comply with law:</h3>
              <p>
                We use your personal information as we believe necessary or
                appropriate to comply with applicable laws, lawful requests, and
                legal processes, such as to respond to subpoenas or requests
                from government authorities.
              </p>
              <h3 className="policy-content-title">With your consent:</h3>
              <p>
                In some cases, we may specifically ask for your consent to
                process your personal information.
              </p>
              <p>
                We may also use your personal information as described elsewhere
                in this Privacy Policy or as disclosed to you at the time of
                collection.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              How we disclose your personal information
            </h2>
            <div className="policy-content">
              <h3 className="policy-content-title">With your consent</h3>
              <p>
                We may share your information at your direction or with your
                consent.
              </p>
              <h3 className="policy-content-title">
                Profiles, listings, and other public information
              </h3>
              <p>
                Your public listing page on the Services will always include
                some basic information, such as your user ID or name associated
                with your account, your public profile photo, and for hosts, the
                city where your car is located, your listing description, your
                calendar availability, transaction related information to allow
                our community to evaluate your reliability and responsiveness,
                and reviews or feedback about you. Your public listing page may
                also include aggregate demand information (such as number of
                page views over a period of time) and information about your
                cancellations. The Services may also display the approximate
                geographic pick-up location of your vehicle.
              </p>
              <p>
                The Services allow your public profile and public listing pages
                to be included in search engines, in which case your public
                profile and public listing pages may be indexed by search
                engines and may be published as search results.
              </p>
              <h3 className="policy-content-title">
                Sharing between hosts and guests
              </h3>
              <p>
                Vancation enables car owners to offer and share their vehicles
                with other individuals. If you agree to a booking through the
                Services, we may provide your information to the other party in
                that transaction as reasonably necessary to facilitate the
                transaction. For example, Vancation may provide your mobile
                phone number to facilitate communication, your driver&apos;s
                license information to confirm license validity, or your
                photograph to facilitate identification. We will also share the
                address of the vehicle and, if applicable, the proposed delivery
                location with the other party. If you used the Trip Photo
                feature, we may share the trip photos you upload and associated
                captions with the other party. The other party may also send you
                text messages (such as to confirm pickup or delivery location).
                Standard telephone minute and text and data charges may apply.
              </p>
              <h3 className="policy-content-title">Service providers</h3>
              <p>
                We may share information with vendors and service providers who
                support the operation of the Services and business and who need
                access to such information to carry out their work for us
                (including, for example, web hosting, analytics, payment
                processing, email delivery, marketing, insurance, claims
                administration, and customer support services). In some cases,
                the service provider may directly collect the information from
                you on our behalf. For hosts who choose to use our photography
                program, your contact information will be shared with the
                photographer assigned to shoot your vehicle. These service
                providers may use your personal information only as directed or
                authorized by us.
              </p>
              <h3 className="policy-content-title">
                Third-party platforms and social media networks
              </h3>
              <p>
                If you have enabled features or functionality that connect the
                Services to a third-party platform or social media network (such
                as by logging in to the Services using your account with the
                third party, providing your API key or similar access token for
                the Services to a third party, or otherwise linking your
                Services account to a third-party’s services), we may disclose
                to the third-party platform or social media network the personal
                information necessary to facilitate the connection or that you
                authorized us to share. We do not control the third party’s use
                of your personal information.
              </p>
              <h3 className="policy-content-title">Professional advisors</h3>
              <p>
                We may disclose your personal information to professional
                advisors, such as lawyers, bankers, auditors, and insurers,
                where necessary in the course of the professional services that
                they render to us.
              </p>
              <h3 className="policy-content-title">Business transfers</h3>
              <p>
                We may sell, transfer, or otherwise share some or all of our
                business or assets, including your personal information, in
                connection with a business transaction (or potential business
                transaction) such as a corporate divestiture, merger,
                consolidation, acquisition, reorganization, or sale of assets,
                or in the event of bankruptcy or dissolution.
              </p>
              <h3 className="policy-content-title">
                Responding to legal requests, preventing harm, and protecting
                our rights
              </h3>
              <p>
                We may disclose your personal information to courts, law
                enforcement, governmental or tax authorities, or third parties.
                We will make such disclosure to the extent we are required or
                permitted to do so by applicable law or where we consider such
                disclosure is reasonably necessary to comply with our legal
                obligations or legal process, to respond to claims asserted
                against us, and for the security and safety purposes described
                above. We may also disclose your information in response to
                valid legal requests relating to criminal investigations or
                alleged or suspected illegal activity or any other activity that
                may expose Vancation, you, or any other user, or to protect the
                rights, property, or personal safety of Vancation, our users, or
                others.
              </p>
              <p>
                We may also disclose your personal information as described
                elsewhere in this Privacy Policy or as disclosed to you at the
                time of collection.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              Your preferences and choices
            </h2>
            <div className="policy-content">
              <h3 className="policy-content-title">
                Communication preferences
              </h3>
              <p>
                You can control the methods by which we may contact you about
                your account, your booking and listing activities, promotions,
                and announcements in the Notifications section within your
                Vancation account.
              </p>
              <h3 className="policy-content-title">
                Opting out of marketing communications
              </h3>
              <p>
                You may opt out of marketing-related emails by following the
                opt-out or unsubscribe instructions at the bottom of the email.
                You may continue to receive service-related and other
                non-marketing emails. If you receive marketing text messages
                from us, you may opt out of receiving further marketing text
                messages from us by replying STOP to our marketing message or as
                described in the message.
              </p>
              <h3 className="policy-content-title">Correct and update</h3>
              <p>
                You can review, correct, update, and edit certain information
                that has been previously provided to us by you at any time by
                logging in to your account and reviewing your account settings
                and profile. You can also access or request a correction of your
                information by contacting us at support@vancation.com. For your
                protection, we may need to verify your identity before
                implementing your request.
              </p>
              <h3 className="policy-content-title">Account closure</h3>
              <p>
                If you wish to close your account and request deletion of your
                personal information, please send an email to
                support@vancation.com.
              </p>
              <p>
                Please note that we may be unable to delete information needed
                to comply with applicable laws, detect or prevent fraud, collect
                any fees owed, resolve disputes, assist with or process claims,
                troubleshoot problems, assist with any audits and
                investigations, to enforce our
                {' '}
                <a href="#">Terms of Service</a>
                ,
                and take other actions reasonably necessary, permitted, or
                required by applicable law. There may also be residual
                information that will remain within our databases and other
                records, which will not be removed.
              </p>
              <h3 className="policy-content-title">Access</h3>
              <p>
                You can request a copy of your personal information pursuant to
                any information access rights that you may have under applicable
                laws in either
                {' '}
                <a href="#">your renter account</a>
                {' '}
                page, or
                {' '}
                <a href="#">your owner account</a>
                {' '}
                page. We may request proof of
                identification or re-authentication to verify your access
                request.
              </p>
              <h3 className="policy-content-title">Location data</h3>
              <p>
                Users of our mobile application can disable the application’s
                access to the device’s location within the device’s settings.
              </p>
              <h3 className="policy-content-title">
                Interest-based advertising choices
              </h3>
              <p>
                Your choices for limiting use of your personal information for
                interest-based advertising include:
              </p>
              <p>
                <span className="font-600 in-black">
                  Blocking cookies in your browser.
                </span>
                {' '}
                Most browsers let you remove or reject cookies, including
                cookies used for interest-based advertising. To do this, follow
                the instructions in your browser settings. Many browsers accept
                cookies by default until you change your settings. For more
                information about cookies, including how to see what cookies
                have been set on your device and how to manage and delete them,
                visit
                {' '}
                <a href="http://www.allaboutcookies.org">
                  www.allaboutcookies.org
                </a>
                .
              </p>
              <p>
                <span className="font-600 in-black">
                  Blocking advertising ID use in your mobile settings.
                </span>
                {' '}
                Your mobile device settings may provide functionality to limit
                use of the advertising ID associated with your mobile device
                (e.g., Apple ID for Advertising or Google Advertising ID) for
                interest-based advertising purposes.
              </p>
              <p>
                <span className="font-600 in-black">
                  Using privacy plug-ins or browsers.
                </span>
                {' '}
                You can block sites from setting cookies for interest-based ads
                by using a browser with privacy features, like Brave, or
                installing browser plugins like Privacy Badger, Ghostery, or
                uBlock Origin, and configuring them to block third party
                cookies/trackers.
              </p>
              <p>
                <span className="font-600 in-black">
                  Advertising industry opt-out tools.
                </span>
                {' '}
                You can also use these opt-out options to limit use of your
                information for interest-based advertising by participating
                companies (but note we may work with companies that do not
                participate in these programs):
              </p>
              <ul className="policy-content-list">
                <li>
                  <a href="https://www.youronlinechoices.eu/">
                    European Interactive Digital Advertising Allian
                  </a>
                </li>
                <li>
                  <a href="http://optout.aboutads.info/">
                    Digital Advertising Alliance (for web users)
                  </a>
                </li>
                <li>
                  <a href="https://youradchoices.com/appchoices">
                    Digital Advertising Alliance (for mobile app users)
                  </a>
                </li>
                <li>
                  <a href="http://optout.networkadvertising.org/?c=1">
                    Network Advertising Initiative
                  </a>
                </li>
              </ul>
              <h3 className="policy-content-title">
                Choosing not to share your personal information
              </h3>
              <p>
                Where we are required by law to collect your personal
                information, or where we need your personal information in order
                to provide the Services to you, if you do not provide this
                information when requested (or we later delete it at your
                request), we may not be able to provide you with the Services.
              </p>
              <h3 className="policy-content-title">
                Third-party platforms and social media networks
              </h3>
              <p>
                If you choose to connect the Services to a third-party platform
                or social media network, such as by using the third party’s
                authentication service to log into your account on the Services,
                you may be able to control your settings through the third-party
                platform or social media network. If you withdraw our ability to
                access certain information from a third-party platform or social
                media network, that choice will not apply to information that we
                have already received from that third party.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">Security</h2>
            <div className="policy-content">
              <p>
                We employ a number of technical, physical, and organizational
                measures designed to protect information against unauthorized
                access, destruction, or alteration while it is under our
                control. However, no method of transmitting or storing
                information can be 100% secure and we cannot guarantee the
                security of your personal information.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              Other important information
            </h2>
            <div className="policy-content">
              <h3 className="policy-content-title">Cross border transfer</h3>
              <p>
                The Services are controlled and operated from the United States.
                Your personal information may be used, stored, and processed in
                any country where we have facilities or in which we engage
                service providers. These locations may be outside of your state,
                province, or country of residence, and may have different and/or
                less protective data protection rules than those of your state,
                province, or country. As a result, this information may be
                subject to access requests from governments, courts, regulatory
                agencies, security authorities, or law enforcement in those
                jurisdictions according to the laws in those jurisdictions. You
                can learn more about how we protect your data from government
                requests by emailing us at support@vancation.com.
              </p>
              <h3 className="policy-content-title">Sensitive information</h3>
              <p>
                We ask that you not send us, and you not disclose, any sensitive
                information (e.g., Social Security numbers, social insurance
                numbers, passports, information related to racial or ethnic
                origin, or health) on or through the Services or otherwise to us
                unless specifically requested.
              </p>
              <h3 className="policy-content-title">Children</h3>
              <p>
                The Services are not intended for anyone under the age of 18 and
                we do not knowingly collect personal information from users
                under the age of 18. If a child under the age of 18 has already
                provided us with personal information, his or her parent or
                guardian may contact us to request that we delete it.
              </p>
              <h3 className="policy-content-title">
                Third-party privacy practices
              </h3>
              <p>
                This Privacy Policy addresses only the use and disclosure of
                information collected by Vancation. This Privacy Policy does not
                address, and we are not responsible for, the privacy,
                information, or other practices of any third parties, including
                any third party operating any site or service to which the
                Services link. The inclusion of a link on the Services does not
                imply endorsement of the linked site or service by us or by our
                affiliates. If you disclose your information to others, or if
                you are directed to a third-party website, their privacy notices
                and practices will apply.
              </p>
              <h3 className="policy-content-title">Translations</h3>
              <p>
                Where Vancation has provided you with a version of this Privacy
                Policy in a language other than English, in case of any wording
                discrepancies between such version and the English version, the
                English wording takes precedence.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              Changes to this privacy policy
            </h2>
            <div className="policy-content">
              <p>
                We may change this Privacy Policy. Please take a look at the
                “Last revised” legend at the top of this page to see when this
                Privacy Policy was last revised. Any changes to this Privacy
                Policy will become effective when we post the revised Privacy
                Policy on the Services or as otherwise indicated. Your use of
                the Services following these changes means that you accept the
                revised Privacy Policy. If you don’t agree to these changes, you
                can contact us to close your account.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">Contact</h2>
            <div className="policy-content">
              <p>
                Vancation welcomes your questions and comments about privacy.
                Please feel free to contact us at our address in the United
                States.
              </p>
              <p>You may also email us at support@vancation.com.</p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              Information for California residents
            </h2>
            <div className="policy-content">
              <p>
                <span className="font-600 in-black">Scope.</span>
                {' '}
                This section
                applies only to California residents entitled to receive the
                information in this section under the California Consumer
                Privacy Act of 2018 (&quot;
                <span span className="font-600 in-black">
                  CCPA
                </span>
                &quot;). It describes how we collect, use, and share Personal
                Information of California residents when we act as a
                &quot;business&quot; as defined under the CCPA, and their rights
                with respect to their Personal Information. For purposes of this
                section, &quot;
                <span span className="font-600 in-black">
                  Personal Information
                </span>
                &quot; has the meaning given in the CCPA but does not include
                information excluded from the scope of the CCPA. In some cases,
                we may provide a different privacy notice to certain categories
                of California residents, such as job applicants, in which case
                that notice will apply instead of this section.
              </p>
              <h3 className="policy-content-title">
                Your California privacy rights.
              </h3>
              <p>As a California resident, you have the rights listed below.</p>
              <p>
                <span className="font-600 in-black">Information.</span>
                {' '}
                You can
                request the following information about how we have collected
                and used your Personal Information:
              </p>
              <ul className="policy-content-list">
                <li>
                  The categories of Personal Information that we have collected
                </li>
                <li>
                  The categories of sources from which we collected Personal
                  Information
                </li>
                <li>
                  The business or commercial purpose for collecting Personal
                  Information
                </li>
                <li>
                  The categories of third parties with whom we share Personal
                  Information
                </li>
                <li>
                  Whether we have disclosed your Personal Information for a
                  business purpose, and if so, the categories of Personal
                  Information received by each category of third-party recipient
                </li>
                <li>
                  Whether we have sold your Personal Information, and if so, the
                  categories of Personal Information received by each category
                  of third-party recipient
                </li>
              </ul>
              <p>
                <span className="font-600 in-black">Access.</span>
                {' '}
                You can
                request a copy of the Personal Information that we have
                collected about you during the past 12 months.
              </p>
              <p>
                <span className="font-600 in-black">Deletion.</span>
                {' '}
                You can
                request that we delete the Personal Information that we have
                collected from you.
              </p>
              <p>
                <span className="font-600 in-black">Nondiscrimination.</span>
                {' '}
                You are entitled to exercise the rights described above free
                from discrimination in the form of any unlawful denial of
                service, increase in the price of services, decrease in service
                quality, or suggestion that you may be penalized for exercising
                your rights.
              </p>
              <h3 className="policy-content-title">
                We do not sell your Personal Information
              </h3>
              <p>
                Based on our understanding of the term &quot;sell&quot; under
                the CCPA, we do not sell personal information to third parties
                and have not sold Personal Information during the twelve months
                preceding the &quot;last revised&quot; date of this Privacy
                Policy. However, like many companies online, we use services
                provided by Google, Facebook, and others that help deliver
                interest-based ads to you as described in the section above
                entitled Interest-based advertising. We describe how you can
                opt-out of use of your Personal Information for interest-based
                advertising in the section entitled Interest-based advertising
                choices.
              </p>
              <h3 className="policy-content-title">
                How to exercise your rights
              </h3>
              <p>
                You can request to exercise your information, access, and
                deletion rights by contacting us at support@vancation.com.
              </p>
              <p>
                We may decline your request where required or permitted by law.
                We will need to confirm your identity to process your requests
                and we reserve the right to confirm your California residency as
                well. Government identification may be required. You may
                designate an authorized agent to make a request on your behalf
                by providing a valid power of attorney, the requester’s valid
                government-issued identification, and the authorized agent’s
                valid government issued identification. We cannot process your
                request if you do not provide us with sufficient detail to allow
                us to understand and respond to it. You should transmit your
                government-issued identification or any other sensitive
                information to us only as instructed. Email is not a secure
                means of communication and you should not email your
                government-issued identification or any other sensitive
                information to us.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              Information for European users
            </h2>
            <div className="policy-content">
              <p>
                The information in this section applies only to individuals in
                the European Economic Area or the United Kingdom (collectively,
                &quot;Europe&quot;).
              </p>
              <p>
                <span className="font-600 in-black">Personal information.</span>
                {' '}
                Except as otherwise specified, references to “personal
                information” in this Privacy Policy are equivalent to “personal
                data” governed by European data protection legislation.
              </p>
              <p>
                <span className="font-600 in-black">Controller.</span>
                {' '}
                Vancation
                LLC is the controller of your personal information covered by
                this Privacy Policy for purposes of the European data protection
                legislation. You may contact us at support@vancation.com.
              </p>
              <p>
                <span className="font-600 in-black">
                  Legal bases for processing.
                </span>
                {' '}
                The legal bases of our processing of your personal information
                as described in this Privacy Policy will depend on the type of
                personal information and the specific context in which we
                process it. If you have questions about the legal basis of how
                we process your personal information, contact us at
                support@vancation.com.
              </p>
              <p>
                <span className="font-600 in-black">Use for new purposes.</span>
                {' '}
                We may use your personal information for reasons not described
                in this Privacy Policy where permitted by law and the reason is
                compatible with the purpose for which we collected it. If we
                need to use your personal information for an unrelated purpose,
                we will notify you and explain the applicable legal basis.
              </p>
              <p>
                <span className="font-600 in-black">Retention.</span>
                {' '}
                We retain
                personal information where we have an ongoing legitimate
                business need to do so (for example, to provide you with a
                service you have requested; to comply with applicable legal,
                tax, or accounting requirements; to establish or defend legal
                claims; or for fraud prevention). When we have no ongoing
                legitimate business need to process your personal information,
                we will either delete or anonymize it, or if this is not
                possible (for example, because your personal information has
                been stored in backup archives), then we will securely store
                your personal information and isolate it from any further
                processing until deletion is possible.
              </p>
              <h3 className="policy-content-title">Your rights.</h3>
              <p>
                European data protection laws give you certain rights regarding
                your personal information. If you are located in Europe you may
                ask us to take the following actions in relation to your
                personal information that we hold:
              </p>
              <p>
                <span className="font-600 in-black">Access.</span>
                {' '}
                Provide you
                with information about our processing of your personal
                information and give you access to your personal information.
              </p>
              <p>
                <span className="font-600 in-black">Correct.</span>
                {' '}
                Update or
                correct inaccuracies in your personal information.
              </p>
              <p>
                <span className="font-600 in-black">Delete.</span>
                {' '}
                Delete your
                personal information.
              </p>
              <p>
                <span className="font-600 in-black">Transfer.</span>
                {' '}
                Transfer a
                machine‐readable copy of your personal information to you or a
                third party of your choice.
              </p>
              <p>
                <span className="font-600 in-black">Restrict.</span>
                {' '}
                Restrict
                the processing of your personal information.
              </p>
              <p>
                <span className="font-600 in-black">Object.</span>
                {' '}
                Object to our
                reliance on our legitimate interests as the basis of our
                processing of your personal information that impacts your
                rights.
              </p>
              <p>
                You may submit these requests by email to support@vancation.com.
              </p>
              <p>
                We may request specific information from you to help us confirm
                your identity and process your request. Applicable law may
                require or permit us to decline your request. If we decline your
                request, we will tell you why, subject to legal restrictions. If
                you would like to submit a complaint about our use of your
                personal information or our response to your requests regarding
                your personal information, you may contact us at
                support@vancation.com or submit a complaint to the data
                protection regulator in your jurisdiction. You can find your
                data protection regulator
                {' '}
                <a href="https://edpb.europa.eu/about-edpb/board/members_en">
                  here
                </a>
                .
              </p>
              <h3 className="policy-content-title">
                Cross‐Border Data Transfer
              </h3>
              <p>
                If we transfer your personal information from Europe to a
                country outside of Europe such that we are required to apply
                additional safeguards to your personal information under
                European data protection laws, we will do so, for example, by
                implementing the standard contractual clauses adopted by the
                European Commission. Please contact us at support@vancation.com
                for further information about any such transfers or the specific
                safeguards applied.
              </p>
              <p>Thanks for using Vancation!</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <Footer />
  </>
);

export default PrivacyPolicy;
