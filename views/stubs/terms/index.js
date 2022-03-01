import React from 'react';

import { Row, Col } from 'antd';
import Header from '../layout/headers/mainHeader/Header';
import { Footer } from '../layout/Footer';

const TermsOfService = () => (
  <>
    <Header unlogged />
    <div className="policy container">
      <Row gutter={24} justify="center">
        <Col>
          <div className="policy-img">
            <img src="/images/termsImg.png" alt="" />
          </div>
        </Col>
        <Col lg={16}>
          <div className="mb-24">
            <h1 className="text-display-jumbo mb-8">Terms of Service</h1>
            <p className="text-subheader font-400 in-gray-700">
              Last updated: 5/27/2021
            </p>
          </div>
          <p className="text-subheader font-400 text-color-gray mb-24">
            Please read these Terms of Service (&quot;Agreement&quot;) carefully before using any of
            the Services (as
            that term is
            defined below) provided by Vancation LLC (&quot;Company”, “we,” or “us”). By using this
            website and its
            related
            mobile application (which we collectively refer to as the “website”) and the Services of
            Company, you are
            agreeing to all the terms contained herein. If you do not agree to this Agreement, your
            only recourse is to
            not use the website or Services of the Company. Our Privacy Policy is incorporated by
            reference into this
            Agreement. Please read this Agreement carefully, as it contains important information
            about limitations of
            liability and resolution of disputes through arbitration rather than court.
          </p>
          <p className="text-subheader font-400 text-color-gray mb-24">
            If you do not fully agree to the terms of this Agreement and any other terms and
            conditions posted or linked
            to the website, you are not authorized to access or otherwise use the website or
            Services. Company reserves
            the right to update this Agreement at any time, at the sole discretion of Company, with
            or without notice to
            you. Any modification to this Agreement will take effect immediately. Your continued use
            and access to the
            website and Services indicates that you agree to any and all modifications to this
            Agreement and also that
            you acknowledge you will be bound to the terms contained herein. Certain areas of the
            website or Services
            (and your access to or use of certain aspects of the Services or Collective Content) or
            different programs
            or offers that we may extend to you, may have different terms and conditions posted or
            may require you to
            agree with and accept additional terms and conditions. If there is a conflict between
            this Agreement and the
            terms and conditions posted for a specific area of the Services, the latter terms and
            conditions will take
            precedence with respect to your use of or access to that area of the Services.
          </p>
          <p className="text-subheader font-400 text-color-gray mb-24">
            If you accept or agree to this Agreement on behalf of a company or other legal entity,
            you represent and
            warrant that you have the authority to bind that company or other legal entity to this
            Agreement and, in
            such event, “you” and “your” will refer and apply to that company or other legal entity.
            Listing services
            are restricted to those persons who are twenty-one (21) years of age and older. Rental
            services are further
            limited to those persons who are twenty-five (25) years of age and older in accordance
            with state and
            federal laws. Any access or use of the Services by anyone under those age restrictions
            is expressly
            prohibited. By visiting the website or utilizing the Services, you warrant you are the
            requisite minimum
            age, and that you have the right, authority, and capacity to agree to and abide by this
            Agreement.
          </p>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              1. Definitions.
            </h2>
            <div className="policy-content">
              <p>
                <span className="in-black font-600">&quot;Collective Content&quot;</span>
                {' '}
                means Member Content and Company Content.
              </p>
              <p>
                <span className="in-black font-600">&quot;Company Content&quot;</span>
                {' '}
                means all Content that Company makes available through the website or Services,
                including any Content
                licensed from a third party, but excluding Member Content.
              </p>
              <p>
                <span className="in-black font-600">&quot;Content&quot;</span>
                {' '}
                means text, graphics, images, music, software (excluding the Company mobile
                application), audio, video,
                information and any other content or materials.
              </p>
              <p>
                <span className="in-black font-600">&quot;Listing&quot;</span>
                {' '}
                means an RV (including campervan) that is listed by an Owner as available for rent
                via the Services.
              </p>
              <p>
                <span className="in-black font-600">&quot;Member&quot;</span>
                {' '}
                means a person who completes the Company&apos;s account registration process,
                including,
                but not limited to
                Owners and Renters.
              </p>
              <p>
                <span className="in-black font-600">&quot;Member Content&quot;</span>
                {' '}
                means all Content that a Member posts, uploads, publishes, submits or transmits to
                be made available on
                the website or through the Services.
              </p>
              <p>
                <span className="in-black font-600">&quot;Owner&quot;</span>
                {' '}
                means a Member who creates a Listing via the Services.
              </p>
              <p>
                <span className="in-black font-600">&quot;Renter&quot;</span>
                {' '}
                means a Member who requests a booking of an RV (including campervan) via the
                Services, or a Member who
                uses an RV rented via the Services and is not the Owner for such RV.
              </p>
              <p>
                <span className="in-black font-600">&quot;RV&quot;</span>
                {' '}
                means a recreational vehicle including, but not limited to campers, vans, coaches,
                school buses,
                ambulances or other recreational vehicles listed on the website.
              </p>
              <p>
                <span className="in-black font-600">&quot;Services&quot;</span>
                {' '}
                means the services provided through the Company’s website and mobile applications,
                pursuant to which
                Owners and Renters may connect, so that Renters may rent an Owner’s RV for a period
                of time for a price
                negotiated by and between the Renter and Owner.
              </p>
              <p>
                <span className="in-black font-600">&quot;Tax” or “Taxes&quot;</span>
                {' '}
                mean any sales taxes, value added taxes (VAT), goods and services taxes (GST) and
                other similar
                municipal, state and federal indirect or other withholding and personal or corporate
                income taxes.
              </p>
              <p>
                <span className="in-black font-600">&quot;User&quot;</span>
                {' '}
                means a party visiting the website and/or requesting a reservation on the website.
                Users include
                Members.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              2. Company is Not a Party to any Transaction Between Members.
            </h2>
            <div className="policy-content">
              <p>
                Company is not and does not hold itself out to be a party to any rental agreements
                between RV Owner and
                RV Renter. Company does not endorse or hold itself out to endorse any Members. In
                addition, the Company
                is not an RV broker, agent or insurer. Company does not have control over the
                conduct of Owners and/or
                Renters or any others that may use the website or Services provided by Company.
                Company expressly
                disclaims all liability in regard to the above to the maximum extent permitted by
                law. Accordingly,
                Owners and Renters are acting on their own behalf and at their own risk.
              </p>
              <p>
                Company is not an owner or operator of RVs, including, but not limited to campers,
                vans, coaches, school
                buses, ambulances, or other RVs, nor is it a provider of RVs. Company does not own,
                sell, resell,
                furnish, provide, rent, re-rent, manage and/or control RVs, or transportation or
                travel services.
                Company’s responsibilities are limited to facilitating the availability of the
                website and Services.
              </p>
              <p>
                Users agree that they are responsible for, and agree to abide by, all laws, rules
                and regulations
                applicable to their use of the website, their use of any tool, service or product
                offered on the website
                and any transaction they enter into on the website or in connection with their use
                of the website.
              </p>
              <p>
                Owners further agree that they are responsible for and agree to abide by all laws,
                rules, ordinances, or
                regulations applicable to the listing of their RV and the conduct of their rental
                business, including
                but not limited to any and all laws, rules, ordinances, regulations or other
                requirements relating to
                taxes, credit cards, data and privacy, permits or license requirements, zoning
                ordinances, safety
                compliance and compliance with all anti-discrimination and fair housing laws, as
                applicable. Please be
                aware that, even though we are not a party to any rental transaction and assume no
                liability for legal
                or regulatory compliance pertaining to RVs listed on the Site, there may be
                circumstances where we are
                nevertheless legally obligated (as we may determine in our sole discretion) to
                provide information
                relating to your Listing in order to comply with requests from governmental bodies
                in relation to
                investigations, litigation or administrative proceedings, and we may choose to
                comply with such
                obligations in our sole discretion.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              3. Services; License to Use the Website & Services.
            </h2>
            <div className="policy-content">
              <p>
                The Services provided through the Company’s website and mobile applications connect
                Owners and Renters,
                so that Renters may rent an Owner’s RV for a period of time for a price negotiated
                by and between the
                Owner and Renter. The Owner and/or Renter may engage Company for Services made
                available through
                Company’s communication tools or through the “Request a Quote” platform. The
                Services are intended to be
                used to facilitate the rental of RVs. You may search Listings as an unregistered
                User on the website;
                however, if you wish to book an RV or create a Listing, you must first register and
                create an account.
              </p>
              <p>
                Users are granted a limited, revocable non-exclusive license to access the website
                and the Services
                solely for the purpose of listing an RV, searching for an RV, purchasing or
                researching (for the purpose
                of inquiring about purchasing) any of the products or services offered on the
                website, or for any other
                purpose clearly stated on the website, all in accordance with this Agreement. Any
                use of the website
                that is not for one of these purposes or otherwise in accordance with this Agreement
                or as otherwise
                authorized by us in writing is expressly prohibited.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              4. Collective Content.
            </h2>
            <div className="policy-content">
              <p>
                Forms. Any and all rental agreements and other forms provided by Company, regardless
                of the nature of
                the contract, form, or documentation, are provided as a template and are not to be
                considered
                representation or prepared for either rental party on behalf of Company. Rental
                parties utilize such
                forms at their own risk and responsibility.
              </p>
              <p>
                Listings. Owners may create a Listing(s) for an RV(s) through their owner dashboard
                when they log into
                their account. By listing an RV, Owners are agreeing to provide true and accurate
                information and are
                representing that the information that they are providing is accurate, that the
                photos contained in the
                Listing are actual photos of the RV being advertised, and that they are not
                misrepresenting their RV in
                any way.
              </p>
              <p>
                Each Owner further represents and warrants that any Listing that such Owner posts
                and the booking of, or
                a Renter’s use of, an RV in a Listing: (i) will not breach any agreements such Owner
                entered into with
                any third parties, and (ii) will (a) be in compliance with all applicable laws, Tax
                requirements, and
                rules and regulations that may apply to any RV included in a Listing posted by such
                Owner (including
                having all required permits, licenses and registrations); and (b) not conflict with
                the rights of third
                parties.
              </p>
              <p>
                Please note that Company assumes no responsibility for a rental party’s compliance
                with any agreements
                with or duties to third parties, applicable laws, rules, and regulations. Company
                disclaims any
                responsibility for the accuracy of the information provided by an Owner. Company
                reserves the right to
                edit any portion of the Listing including the content or the photos contained and
                provided in the
                Listing. Further, Company reserves the right to (but is under no obligation to)
                terminate any Listing,
                without notice to you, either temporarily or permanently, if Company believes that
                any of the
                information posted is inaccurate and/or misrepresents the RV in any way.
              </p>
              <p>
                Member Content. By making available any Member Content on or through the website or
                the Services, you
                hereby grant to Company a worldwide, irrevocable, perpetual, non-exclusive,
                transferable, royalty-free
                license, with the right to sublicense, to use, view, copy, adapt, modify,
                distribute, license, sell,
                transfer, publicly display, publicly perform, transmit, stream, broadcast, access,
                view, and otherwise
                exploit such Member Content on, through, or by means of the Services or otherwise.
                Without limiting the
                generality of the foregoing, Company may aggregate Member Content and other Member
                or User data with the
                data and information of other Members and Users of the Services for purposes of data
                analytics and in
                order to measure, enhance, and improve the Services; provided, that any such
                aggregation or analysis
                will be on an anonymous, non-personally identifiable basis, and will not identify
                any data as belonging
                to or being provided by any specific customer or other organization.
              </p>
              <p>
                You acknowledge and agree that you are solely responsible for all Member Content
                that you make available
                through the Services. Accordingly, you represent and warrant that: (i) you either
                are the sole and
                exclusive owner of all Member Content that you make available through the Services
                or you have all
                rights, licenses, consents and releases that are necessary to grant to Company the
                rights in such Member
                Content, as contemplated under this Agreement; and (ii) neither the Member Content
                nor your posting,
                uploading, publication, submission or transmittal of the Member Content or Company’s
                use of the Member
                Content (or any portion thereof) on, through or by means of the Services or
                otherwise will infringe,
                misappropriate or violate a third party’s patent, copyright, trademark, trade
                secret, moral rights or
                other proprietary or intellectual property rights, or rights of publicity or
                privacy, or result in the
                violation of any applicable law or regulation.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              5. Unauthorized Uses of the Website and
              Services.
            </h2>
            <div className="policy-content">
              <p>
                The license to use the website and Services granted to Users does not include any
                right of collection,
                aggregation, copying, scraping, duplication, display or any derivative use of the
                website nor any right
                of use of data mining, robots, spiders or similar data gathering and extraction
                tools without our prior
                written permission; provided, however, that a limited exception from the foregoing
                exclusion is provided
                to general purpose internet search engines that use tools to gather information for
                the sole purpose of
                displaying hyperlinks to the website, provided they each do so from a stable IP
                address or range of IP
                addresses using an easily identifiable agent.
              </p>
              <p>
                Unauthorized uses of the website also include, without limitation, those listed
                below. You agree not to
                do any of the following, unless otherwise previously and specifically agreed to by
                us:
              </p>
              <ul className="policy-content-list">
                <li>
                  Any commercial use of the website or any content on the website, other than by
                  Members in good
                  standing;
                </li>
                <li>
                  Copy, reproduce, upload, post, display, republish, distribute or transmit any part
                  of the Collective
                  Content in any form whatsoever;
                </li>
                <li>
                  Reproduce any portion of the website on your website or otherwise, using any
                  device including, but not
                  limited to, use of a frame or border around the website, or other framing
                  technique to enclose any
                  portion or aspect of the website, or mirror or replicate any portion of the
                  website;
                </li>
                <li>
                  Deep-link to any portion of the website without our express written permission;
                </li>
                <li>
                  Modify, translate into any language or computer language or create derivative
                  works from, any content
                  or any part of the website;
                </li>
                <li>
                  Reverse engineer any part of the website;
                </li>
                <li>
                  Sell, offer for sale, transfer or license any portion of the website in any form
                  to any third parties;
                </li>
                <li>
                  Use the website and its inquiry or booking functionality other than to advertise
                  and/or research RVs,
                  to make legitimate inquiries or any other use expressly authorized on the website;
                </li>
                <li>
                  Use the website to post or transmit information that is in any way false,
                  fraudulent, or misleading,
                  including making any reservation or inquiry under false pretenses, or taking any
                  action that may be
                  considered phishing or that would give rise to criminal or civil liability;
                </li>
                <li>
                  Post or transmit any unlawful, threatening, abusive, libelous, defamatory,
                  obscene, vulgar, indecent,
                  inflammatory, sexually explicit, pornographic or profane material;
                </li>
                <li>
                  Violate, plagiarize or infringe the rights of us or third parties including,
                  without limitation,
                  copyright, trademark, patent, trade secrets, rights of publicity or privacy or any
                  other intellectual
                  or proprietary rights;
                </li>
                <li>
                  Use or access the website in any way that, in our sole discretion, adversely
                  affects, or could
                  adversely affect, the performance or function of the website or any other system
                  used by us or the
                  website.
                </li>
              </ul>
              <p>
                PLEASE NOTE THAT, AS STATED ABOVE, THE SERVICES ARE INTENDED TO BE USED TO
                FACILITATE THE BOOKING OF
                RVS. COMPANY CANNOT AND DOES NOT CONTROL THE CONTENT CONTAINED IN ANY LISTINGS AND
                THE CONDITION,
                LEGALITY OR SUITABILITY OF ANY RVS. COMPANY IS NOT RESPONSIBLE FOR AND DISCLAIMS ANY
                AND ALL LIABILITY
                RELATED TO ANY AND ALL LISTINGS AND RVS. ACCORDINGLY, ANY BOOKINGS WILL BE MADE AT
                THE RENTER’S AND
                OWNER’S OWN RISK.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              6. Use of Other Users’ Information; No Spam.
            </h2>
            <div className="policy-content">
              <p>
                You agree that, with respect to other Users’ personal information that you obtain
                directly or indirectly from or through the website or through any Services,
                transaction or software, we have granted to you a license to use such information
                only for: (i) website-related communications that are not unsolicited commercial
                messages, (ii) using Services offered through the website, and (iii) inquiring about
                or otherwise facilitating a financial transaction between you and the other User
                related to the purpose of the website. Any other purpose will require express
                permission from the User. You may not use any such information for any unlawful
                purpose or with any unlawful intent.
              </p>
              <p>
                We do not tolerate spam or unsolicited commercial electronic communications of any
                kind. Therefore, without limiting the foregoing, you are not licensed to add a User,
                even a User who has rented an RV from you or to you, to your mailing list (email or
                physical mail) without the User’s express consent. You may not use any tool or
                service on the website to send spam or unsolicited commercial electronic
                communications of any kind or in any other way that would violate this Agreement.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              7. Account Registration; Identity Verification.
            </h2>
            <div className="policy-content">
              <p>
                In order to list an RV as available for rent, Owners must become a Member and sign
                up with an account through Company. Renters must create an account in order to use
                the Services provided by the Company and rent an RV. Accounts may be created through
                third-party accounts such as Facebook or Google, or, Users have the option to create
                an account with a valid email address. PLEASE NOTE THAT YOUR RELATIONSHIP WITH SUCH
                THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY
                SERVICE PROVIDERS. Company reserves the right to terminate an account at any time
                with no notice to you.
              </p>
              <p>
                In order to access and use the Service, you will be required to apply for and obtain
                a username and password. You are responsible for maintaining the security and
                confidentiality of any user name or password assigned to you. You agree to (i) keep
                your password and username for both your account with us and your email account (if
                you use it to create your website account) secure and strictly confidential,
                providing it only to authorized users of your accounts, (ii) instruct each person to
                whom you give your user name and password that he or she is not to disclose it to
                any unauthorized person, (iii) notify us immediately and select a new username and
                password if you believe your password for either your account with us or your email
                account may have become known to an unauthorized person, and (iv) notify us
                immediately if you are contacted by anyone requesting your username and password.
                Further, if we suspect any unauthorized access to your account, upon our request,
                you agree to promptly change your user name and password and take any other related
                action as we may reasonably request.
              </p>
              <p>
                Company offers an integrated identity verification solution powered by a third party
                Vouched ID (&quot;Vouched.ID&quot;). Members are asked to provide their photograph
                and their driver’s license which is then sent to Vouched to determine if the
                photograph matches the holder of the driver’s license. You may be required to pass
                Vouched’s identity verification test to maintain your Vancation account. You agree
                to your photograph and form of identification being transferred, stored and
                processed by Vouched in accordance with the Vouched Privacy Policy. Further
                information about Vouched and its services can be found at
                {' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://vouched.id/"
                >
                  https://vouched.id/
                </a>
                .
              </p>
              <p>
                We discourage you from giving anyone access to your user name and password for your
                account with us. However, if you do give someone your username and password, or if
                you fail to adequately safeguard such information, you are responsible for any and
                all transactions that the person performs while using your account, even those
                transactions that are fraudulent or that you did not intend or want performed.
              </p>
              <p>
                EACH MEMBER ACKNOWLEDGES AND AGREES THAT: (1) NEITHER COMPANY NOR ANY OF ITS
                AFFILIATES WILL HAVE ANY LIABILITY TO ANY USER FOR ANY UNAUTHORIZED TRANSACTION MADE
                USING ANY MEMBER’S USER NAME OR PASSWORD; AND (2) THE UNAUTHORIZED USE OF YOUR USER
                NAME AND PASSWORD FOR YOUR WEBSITE ACCOUNT COULD CAUSE YOU TO INCUR LIABILITY TO
                BOTH COMPANY AND OTHER USERS.
              </p>
              <p>
                Although this Agreement requires all Members to provide accurate information,
                Company does not attempt to confirm, and does not confirm, any Member’s purported
                identity or other information provided by the Member. It is your sole responsibility
                for determining the identity and suitability of others who you contact via the
                Services. Except as provided by this Agreement, we will not be responsible for any
                damage or harm resulting from your interactions with any User or other party through
                the website or the Services. We therefore recommend that you always exercise due
                diligence and care when deciding whether to rent a RV from an Owner, or to accept a
                booking request from a Renter, or to have any other interaction with any User or
                other party. We are not responsible for any damage or harm resulting from your
                interactions with other Users or third parties.
              </p>
              <p>
                Further, we may, without notice to you, suspend or cancel your listing or
                reservation at any time even without receiving notice from you if we suspect, in our
                sole discretion, that your account with us or your email account is being used in an
                unauthorized or fraudulent manner.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">8. Payment Processing.</h2>
            <div className="policy-content">
              <p>
                Company uses the third-party payment platform, Stripe, Inc. (&quot;Stripe&quot;), to
                process credit and debit card transactions. Owners will be required to establish a
                Stripe Connect account. By using Stripe, you agree to be bound by Stripe’s Terms of
                Service. Further information about Stripe and its services can be found at
                {' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://stripe.com/connect"
                >
                  https://stripe.com/connect
                </a>
                .
              </p>
              <p>
                You expressly understand and agree that all payments and monetary transactions are
                handled by Stripe. You agree that the Company shall not be liable for any issues
                regarding financial and monetary transactions between you and any other party,
                including Stripe.
              </p>
              <p>
                You understand that the Stripe API is subject to change at any time. Members are
                expressly prohibited from processing stolen credit cards or unauthorized credit
                cards through Stripe.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              9. Online Booking.
            </h2>
            <div className="policy-content">
              <p>
                Owner and Renter will negotiate and set all RV rental pricing between themselves.
                Owner is responsible for requesting payment from Renter through the Company&apos;s
                secure
                payment system. All payments by Renters are via credit card.
              </p>
              <p>
                An RV rental booking is only reserved when the first (or only) payment on a booking
                reservation has been processed through the Company&apos;s secure payment system.
                Company
                guarantees all RV Renter payments made through Company’s payment system up to one
                thousand US dollars ($1,000.00 USD). At the Owner’s discretion, Renters may split
                the booking payment in to two (2) installments, if and only if the rental dates are
                more than fourteen (14) days in advance of the first payments; However in all cases,
                final payment must be made on or before fourteen (14) days prior to the rental date.
                Company holds all payments made during the fourteen (14)-day period. Company will
                release payments, minus all applicable fees collected by Company, to the applicable
                Owner one (2) business days after the end of the rental date.
              </p>
              <p>
                If you are an Owner and a booking is requested for your RV via the Services, you may
                be required to either confirm or reject the booking within twenty-four (24) hours of
                when the booking is requested (as determined by Company in its sole discretion) or
                the booking request may be automatically canceled. If you are unable to confirm or
                decide to reject a booking within such twenty-four (24)-hour period, any amounts
                collected by Company for the requested booking may be refunded to the applicable
                Renter’s credit card and any pre-authorization of such credit card will be released.
                When you confirm a booking requested by a Renter, Company will send you an email,
                text message or message via the Services confirming such booking, depending on the
                selections you make.
              </p>
              <p>
                By utilizing a rental agreement as part of the Services or otherwise displaying
                terms relating to the rental as part of the online booking process (including such
                terms that we may require), the Renter and Owner each agree to the terms and
                conditions set forth in the rental agreement or other such terms displayed in the
                booking process (including without limitation the cancellation refund policy)
                effective as of the date that the Renter indicates acceptance of the booking or
                rental agreement, as applicable. You hereby acknowledge and agree that (i) you are
                fully responsible for such terms and conditions, (ii) any rental agreement used,
                whether a sample provided by the Company or other agreement, is used solely at their
                own risk and expense, (iii) nothing contained in the rental agreement, on the
                website or in this Agreement is a substitute for the advice of an attorney and (iv)
                that you have been hereby advised to obtain local legal counsel to prepare, review
                and revise as necessary any rental agreements to ensure compliance with federal,
                state and local law and their particular circumstances, and to revise the rental
                agreement as necessary to accurately represent the RV, rules, features, etc.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              10. Appointment of Vancation as Limited Payment Collection Agent for Owner.
            </h2>
            <div className="policy-content">
              <p>
                Each RV Owner collecting payment for services provided via the website and Services
                hereby appoints Company as the Owner’s limited agent solely for the purpose of
                collecting payments made by Renters purchasing such services. Each Owner agrees that
                payment made by a Renter to an Owner through Company shall be considered the same as
                a payment made directly to the Owner and the Owner will make the RV available to
                Renter in the agreed upon manner as if the Owner had received payment directly from
                the Renter. Each Owner agrees that Company may, in accordance with the cancellation
                policy selected by the Owner and reflected in the relevant Listing: (i) permit the
                Renter to cancel the booking and (ii) refund to the Renter that portion of the
                payment specified in the applicable cancellation policy. If there is a dispute
                concerning the cancellation policy or any refunds, Company must be contacted at
                least forty-eight (48) hours prior to the rental start date. In accepting
                appointment as the limited payment collection agent of the Owner, Company assumes no
                liability for any acts or omissions of the Owner. Owner understands and recognizes
                Company as the limited payment collection agent and agrees that Company controls the
                dispersal of all funds in accordance with this Agreement and the cancellation policy
                chosen by Owner and that Company has the final say in all payment disputes. In
                accepting appointment as the limited payment collection agent of the Owner, Company
                assumes no liability for any acts or omissions of the Owner.
              </p>
              <p>
                Please note that the Company does not currently charge fees for the creation of
                Listings. However, you acknowledge and agree that the Company reserves the right, in
                its sole discretion, to charge you for and collect fees from you for the creation of
                Listings, or for other features of the Services. Please note that the Company will
                provide notice of any such additional fees via the Services, prior to implementing
                such fees.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              11. Damage to RVs.
            </h2>
            <div className="policy-content">
              <p>
                Renter will be solely responsible for the condition of the RV which includes both
                the full interior of the RV and any and all parts of the exterior of the RV during
                the rental period and the condition that the RV is returned to the Owner in. Renters
                (and not Company) will be held liable for any and all damages to the RV that occur
                during the rental period. Further, Renters will be held liable for any damage that
                cannot be proven to have existed prior to the rental period. All Members agree to
                assist the Company in the settlement of security deposit claims and dispute
                resolution.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              12. Security Deposits.
            </h2>
            <div className="policy-content">
              <p>
                Company will preauthorize a security deposit forty-eight (48) hours prior to the
                rental date for Owners. Company will keep Renter credit card pre authorized for all
                security deposit funds during the rental period. Owners have the right to request a
                payment from the security deposit funds within the twenty four (24) hours after the
                rental period. Owners must submit dated departure and return forms, supplied by the
                Company, along with their request for reimbursement. Company will review the request
                for payment and release the requested amount to Owners after seventy-two (72) hours
                have passed from the rental end date, should Company approve the request. Company
                may also request additional information from either rental party. If, as a Renter,
                Company determines that you are responsible for damaging an RV or any personal or
                other property located in an RV pursuant to this Agreement, you authorize Company to
                charge the credit card or ACH used to make the booking in order to collect any
                security deposit associated with the Listing and/or any additional charges.
              </p>
              <p>
                After the completion of the rental period, certain amounts charged by the Owner in
                excess of the security deposit must be expressly agreed to by the Renter in writing
                before the Company will charge the Renter’s credit card for the overage amount.
              </p>
              <p>
                Should a dispute arise between the rental parties, Company will use commercial
                standards and act as a neutral third party to settle any disputes. Company will
                serve as the final authority on all security deposit dispute resolution.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              13. Insurance.
            </h2>
            <div className="policy-content">
              <p>
                Members are solely responsible for obtaining insurance coverage sufficient to
                protect their RVs, guests, or trip, as applicable. Owners agree that they have or
                will obtain the appropriate insurance coverage sufficient to cover the rental of the
                RV before listing the RV for rent on the website and will maintain adequate
                insurance coverage for so long as they list RVs for rent on the website. Further,
                Owners agree to provide the Company with copies of relevant proof of coverage upon
                request.
              </p>
              <p>
                If you choose to purchase RV Rental Insurance offered through (Named Insured),
                underwritten by a leading USA specialty insurance underwriter, referred to
                throughout as “The Policy” you will be added as additional insured to the (Named
                Insured) Master Fleet Rental Insurance Policy, which is an excess and surplus lines
                policy issued in the state of (Policy State).
              </p>
              <p>
                The Policy covers accidents or occurrences while the Renter or an Authorized Driver
                is operating the vehicle listed on The Policy, for the coverage provided by The
                Policy and for which you have paid a premium. In addition, The Policy covers
                accidents or occurrences while the vehicle listed on The Policy is occupied but not
                under operation, for the coverage provided by The Policy and for which you have paid
                a premium. Coverage will include: for units 15 years old or newer Comprehensive and
                Collision with a (Policy Deductible) deductible per occurrence and for motorized
                units only bodily injury and property damage liability, (Policy Liability Limit), on
                an excess basis. This is the Underlying Liability coverage offered through The
                Policy.
              </p>
              <p>
                If The Policy is cancelled at your request prior to taking possession of the RV
                rental, there will be no minimum earned premium retained by the insurer for this
                insurance. However, if this insurance is cancelled at your request after taking
                possession of the RV rental, the premium will be fully earned and retained by the
                insurer.
              </p>
              <p>
                The Policy does not offer nor cover You, or anyone using the RV, for Uninsured,
                Underinsured or Uninsured/Underinsured Motorists Bodily Injury or Property Damage,
                Medical Payments Coverage or Personal Injury Protection or any other coverage not
                noted above. The named insured has rejected all coverage other than the coverage
                defined and offered for purchase herein and as a purchaser of coverage under The
                Policy you expressly agree to the selection and rejections made by the named insured
                under The Policy. However, The Policy may comply with individual state specific
                requirements. If an accident, to which The Policy applies, occurs in any state or
                province other than the one in which The Policy is written, we will interpret The
                Policy coverage for the Accident or occurrence as follows:
              </p>
              <p>
                If the state or province has a financial responsibility, compulsory insurance or
                similar law requiring a driver using a recreational vehicle in that state or
                province to maintain insurance with limits of liability for bodily injury or
                property damage higher than the limits The Policy provides, then the limits of
                liability under The Policy that will apply to that accident will be the higher
                Minimum Liability Coverage limits required by the law in that state or province or
                the applicable limits of liability provided for that insured under The Policy.
              </p>
              <p>
                The Policy’s coverage territory is the United States. There is no coverage for
                accidents occurring in Mexico.
              </p>
              <p>
                By purchasing this insurance, you expressly agree that you understand and agree that
                coverages are limited as set forth above and that the intent of The Policy that you
                selected to purchase coverage under is to provide Liability coverage to third
                parties who may be injured by your operation of the RV and to provide Comprehensive
                and Collision coverage for the RV you have rented.
              </p>
              <p>
                Your risk is not protected by the state insurance insolvency fund, and the insurer
                or the risk retention group from which your purchasing group obtained its insurance
                may not be subject to all of the insurance laws and rules of this state.
              </p>
              <p>
                Completed Departure and Return forms, supplied by Company, must be submitted in the
                event a claim is filed. These forms are collected during the booking process
                digitally and will be signed by both Owner and Renter. The Departure and Return
                Forms must be dated by the owner no later than 48 hours after the end of term in
                which the loss occurred. However, in the event that the owner does not complete the
                Departure and Return forms, as supplied by Company, within 48 hours after the end of
                term in which the loss occurred, then any damages paid out of The Policy will be
                reduced by 200% of the applicable deductible listed on the Declarations Page up to a
                maximum of $3,000. The Policy will not pay for a loss which is not reported within
                10 days after the end of the rental term in which the loss occurred.
              </p>
              <p>
                Renter agrees that the Insurer may charge their payment method for the full premium
                amount related to a rental booked through the Company. Renter also agrees that
                premium is fully earned and non-refundable once Renter has taken possession of the
                covered RV. In addition, the Renter authorizes the Company to charge the credit card
                or ACH used to make the booking to collect any deductible amount owed in excess of
                the withheld Security Deposit.
              </p>
              <p>
                In the event that a Renter initiates a chargeback with their credit card company for
                the insurance premium charge, Insurer will use commercially reasonable efforts to
                dispute the validity of the chargeback. Owner and Renter agree to cooperate with the
                Insurer and to provide any information that may be reasonably requested by the
                Insurer in its investigation. Owner and Renter authorize the Insurer to share
                information about a chargeback with Company, the Renter, the Renter’s financial
                institution, the Owner, and the Owner’s financial institution in order to
                investigate or mediate a Chargeback. Renter acknowledges that chargeback decisions
                are made by the applicable issuing bank, Card Networks, or NACHA and all judgments
                as to the validity of the chargeback are made at the sole discretion of the
                applicable issuing bank, card networks, or NACHA.
              </p>
              <p>
                If you do not choose to purchase RV rental insurance made available via The Policy,
                then it is the sole responsibility of Owners to ensure that Renters have obtained
                and secured the proper insurance coverage for the rental period. Additionally, it is
                the sole responsibility of Owners to check the insurance policy of the RV Renter so
                make sure that the policy obtained is in compliance with state and federal law
                minimums.
              </p>
              <p>
                Your risk is not protected by the state insurance insolvency fund, and the insurer
                or the risk retention group from which your purchasing group obtained its insurance
                may not be subject to all of the insurance laws and rules of this state.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              14. Company Service Fees.
            </h2>
            <div className="policy-content">
              <p>
                In consideration for your access to and use of the Services, you agree to pay the
                fees, charges, and other amounts set forth herein or that may otherwise be charged
                by the Company from time to time and as set forth on the website or the Services.
                Payment for Services will be paid via credit card or ACH directly to the Company.
                Company reserves the right to increase fees at the end of each term without notice
                to the Party. In the event of non-payment or late payment, Company reserves the
                right to suspend services until the full amount due is paid in full. Delinquent
                amounts are subject to interest of 2.5% per month on any outstanding balance, or the
                maximum permitted by law, whichever is less, plus all expenses of collection,
                including Company’s attorneys’ fees. You will continue to be charged for amounts
                owed hereunder during any period of payment delinquency. Further, and without
                limiting any other rights or remedies available to Company hereunder or under
                applicable law, in the case of any payment default, Company, may, in its sole
                discretion, remove or delete any of your Member Content or other data that may be
                stored or maintained by you on the Services. Removal of such Member Content or data
                does not relieve you of your obligation to pay any outstanding charges assessed to
                your account. Company will not be obligated to restore any Member Content or other
                data removed from the Services for Members or other users who are in default.
              </p>
              <p>
                Company charges a Vancation Service Fee payable by Renters who book via the website.
                The Vancation Service Fee covers the use of the website and Services, including such
                features as 24/7 roadside support, and is calculated as a percentage of the total
                reservation amount (which may or may not include additional fees, taxes and
                deposits). The Vancation Service Fee will be refunded along the following lines (see
                section 16 for all details of cancellation policies):
              </p>
              <ul className="policy-content-list">
                <li>
                  In the event of a cancellation by an Owner: Full refund of the Vancation Service
                  Fee
                </li>
                <li>
                  In the event of a Renter cancellation for which they are entitled to a full refund
                  under the cancellation policy: Full refund of the Vancation Service Fee
                </li>
                <li>
                  In the event of a Renter cancellation for which they are not entitled to a full
                  refund under the cancellation policy: No refund of the Vancation Service Fee
                </li>
              </ul>
              <p>
                Any taxes alleged to be owed by any taxing authority on the Vancation Service Fee
                are the responsibility of the Company.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              15. Vancation Renter Fees.
            </h2>
            <div className="policy-content">
              <p>
                The fees you see listed below are related to any post-rental resolution between the
                Owner and the Renter. Failure to charge any of the fees below shall not constitute a
                waiver of the right to exercise the same in the event another fee should become due
                at any other time. More information about the Post-Trip Fee Policy can be found in
                the help center.
              </p>
              <p>
                Administrative Fee. Company shall charge the Renter an administrative fee on any
                charges listed by the Owner on the Return form (identified as overages, charges,
                damages).
              </p>
              <p>
                Late Fee. If a Renter returns the RV after the agreed rental period end time, such
                Renter will be charged a late fee. This late fee is calculated by combining an
                administrative fee to the prorated hourly rental rate (based on the daily rate for
                the RV rented). If the late return results in the disruption of another rental or
                Company needs to find the owner of the RV alternative transportation due to the late
                return, the Renter will pay the full daily rate for every eight (8) hours the RV is
                late. These charges will be added to the initial rental rate agreed upon by the
                Owner and Renter.
              </p>
              <p>
                Cleaning Fee. We understand that RVs get dirty out on the road. Returning an RV with
                a normal amount of dirt is acceptable and will not result in any additional charges.
                However if an RV is returned covered in dirt, soot, trash, food, wine stains, etc,
                and you, as Renter, do not clean the RV prior to returning it, the Owner may charge
                the Renter, possibly through Company, an additional cleaning fee. These fees may
                vary for each Owner.
              </p>
              <p>
                No-Show Fee. If the Owner does not show up to meet the Renter and make the RV
                available for the Renter at the agreed upon rental start time, Company will treat
                this as an Owner cancellation. If a Renter does contact the Company to cancel the
                rental, the Renter will be charged the total amount for the rental period until the
                issue is resolved. If the Renter does not show to pick up the RV, it will be treated
                as a Renter cancellation and subject to the Owner’s cancellation policy.
              </p>
              <p>
                Refueling Fee. Renters should check with the Owner to discuss their fuel options and
                miscellaneous charges before the rental begins. The RV’s gas tank and propane tanks
                should be full when you pick it up, but be sure to discuss expectations and options.
                The typical refueling options that our Owners offer are:
              </p>
              <ul className="policy-content-list">
                <li>
                  The Owner includes fuel with the rental (not very common).
                </li>
                <li>
                  The Renter refuels the RV prior to the end of the rental and returns it with the
                  same amount of fuel at the time of pickup. If the rented RV is not refueled upon
                  return, the Owner will send the Company the receipt. The amount will be charged to
                  the Renter plus an administrative fee.
                </li>
              </ul>
              <p>
                RV Damage. A $150 fee will be incurred for stranding an RV (in addition to any costs
                incurred to repair the RV). In the case of any damage to the RV (fiberglass,
                cushions, cabinetry, electronics, etc.), the Renter will be charged the actual cost
                of parts plus hourly labor costs needed to repair the damaged item. The amount will
                be charged to the Renter plus an administrative fee.
              </p>
              <p>
                Lost Item Fee. Any lost or damaged items will be valued at Good Sams or Amazons
                Internet retail pricing for comparable item(s). The amount must be claimed on the
                Damage Form and will be charged to the Renter plus an administrative fee.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              16. Cancellation Policies; Refunds.
            </h2>
            <div className="policy-content">
              <p>
                Company offers various levels of cancellation policies to Owners. Owners will choose
                from the policies outlined below when negotiating or setting the price for their RV
                rental. Each cancellation policy details the possible refund for the Renter.
              </p>
              <ul className="policy-content-list">
                <li>
                  Easy Going: Travelers who cancel at least 14 days before check-in will get back
                  100% of the amount they&apos;ve paid. If they cancel between 7 and 14 days before
                  check-in, they&apos;ll get back 50%. Otherwise, they won&apos;t get a refund.
                </li>
                <li>
                  Firm but Fair: Travelers who cancel at least 30 days before check-in will get back
                  100% of the amount they&apos;ve paid. If they cancel between 14 and 30 days before
                  check-in, they&apos;ll get back 50%, minus service fees. Otherwise, they
                  won&apos;t get a refund.
                </li>
                <li>
                  By the Book: Travelers who cancel at least 60 days before check-in will get back
                  100% of the amount they&apos;ve paid. If they cancel between 30 and 60 days before
                  check-in, they&apos;ll get back 50%, minus service fees. Otherwise, they
                  won&apos;t get a refund.
                </li>
              </ul>
              <p>
                Renter will be required to agree to the cancellation policy selected by the Owner.
                Any Renter who wishes to cancel their booking must submit a cancellation request
                through the Vancation platform. The cancellation request will be processed according
                to the Owner’s chosen cancellation policy which the Renter previously agreed to.
              </p>
              <p>
                In order to receive any type of refund, cancellations must be made by 11:59pm PST on
                the day set forth in the applicable cancellation policy.
              </p>
              <p>
                For all bookings made seven (7) or more days prior to the rental start date, there
                is an eight (8) hour grace cancellation period wherein the Renter will be entitled
                to a refund of all monies paid.
              </p>
              <p>
                For all bookings made less than seven (7) days prior to the rental start date, there
                is only a one (1)-hour grace cancellation grace period wherein the Renter will be
                entitled to a refund of all monies paid. Once the rental period starts, the booking
                is non-refundable.
              </p>
              <p>
                From time to time, at Company’s sole discretion, Company may offer refunds outside
                of the cancellation policy.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              17. Chargebacks.
            </h2>
            <div className="policy-content">
              <p>
                In the event that a Renter initiates a chargeback with their credit card company,
                for either rental fees or a security deposit, the Company will inform the Owner that
                a chargeback has been initiated. If Company deems that the chargeback is not
                warranted, Company will use commercially reasonable efforts to dispute the validity
                of the chargeback on the Owner’s behalf. Owner agrees to cooperate with the Company
                and to provide any information that may be reasonably requested by the Company in
                its investigation. If you are an Owner, you authorize the Company to share
                information about a chargeback with the Renter, the Renter’s financial institution,
                and Owner’s financial institution in order to investigate or mediate a chargeback.
                In the event that a chargeback dispute is lost, and funds are debited from Company’s
                account, Owner authorizes Company to, without notice, recapture such amount from
                Owner’s bank account or to withhold such amount from any payment due to Owner now or
                in the future. Owner acknowledges that chargeback decisions are made by the
                applicable issuing bank, card networks, or NACHA and all judgments as to the
                validity of the chargeback are made at the sole discretion of the applicable issuing
                bank, Card Networks, or NACHA.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              18. Taxes.
            </h2>
            <div className="policy-content">
              <p>
                If you are an Owner, you understand and agree that you are responsible for
                determining your applicable Tax-reporting requirements in consultation with your tax
                advisors. Company does not offer tax, accounting, financial, legal, or any other
                professional advice to any users of the website or the Services. Additionally,
                except as otherwise provided in this section, note that each Owner is responsible
                for determining local indirect Taxes and for including any applicable Taxes to be
                collected or obligations relating to applicable Taxes in their Listing(s). In
                compliance with state and local tax laws, Vancation may be required to collect and
                remit applicable taxes on behalf of owners.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              19. Refer a Friend Program
            </h2>
            <div className="policy-content">
              <p>
                Under the Company’s Refer a Friend Program (the “Program”), Vancation Owners or
                Renters (each a “Referring Owner” or “Referring Renter”) may invite prospective
                owners or renters who are not currently Owners on Vancation.com or who have not
                previously rented with Vancation.com (each a “Referred Owner” or “Referred Renter”)
                to either create a Listing or rent an RV. Referring Owners, Referring Renters,
                Referred Owners and Referred Renters shall all be referred to as “Program
                Participants.”
              </p>
              <p>
                <i>For Referring Owners and Referred Owners.</i>
                {' '}
                Once a Listing has been verified and the other conditions for payment (specified
                below) have occurred, the Referring Owner and the Referred Owner are eligible to
                receive a one-time “Referral Bonus” for travel credits on the Vancation platform and
                sometimes cash, in an amount established by the Company from time to time in its
                sole discretion.
              </p>
              <p>
                By participating in the Program, the Referred Owner acknowledges that the Company
                may at its sole discretion, share the Referred Owner’s first name and member status
                in the Referring Owner’s user account setting to inform the Referring Owner about
                the status of the earned Referral Bonus. If you do not want the Referring Owner to
                receive the information about you, please do not finalize your Listing after
                clicking on the Referral Link. Your participation in the Program will terminate and
                neither party will be eligible for a Referral Bonus.
              </p>
              <p>
                A Referral Bonus can be earned as follows:
              </p>
              <ul className="policy-content-list">
                <li>
                  The Referring Owner shares the referral link with the Referred Owner as provided
                  on the website (the “Referral Link”).
                </li>
                <li>
                  The Referred Owner receiving the link creates a Listing through the Services by
                  clicking on the Referral Link; and
                </li>
                <li>
                  A booking for the RV subject to the Listing is confirmed as completed by the
                  Company.
                </li>
              </ul>
              <p>
                A Referring Owner will not share or publish the Referral Links where there is no
                reasonable basis for believing that recipients are genuine RV owners,
              </p>
              <p>
                <i>For Referring Renters and Referred Renters.</i>
                {' '}
                Once a reservation has been verified and the other conditions for payment (specified
                below) have occurred, the Referring Renter and the Referred Renter are eligible to
                receive a one-time “Referral Bonus” for travel credits on the Vancation platform and
                sometimes cash, in an amount established by the Company from time to time in its
                sole discretion.
              </p>
              <ul className="policy-content-list">
                <li>
                  The Referring Renter shares the referral link with the Referred Renter as provided
                  on the website (the “Referral Link”).
                </li>
                <li>
                  The Referred Renter receiving the link completes an RV booking; and
                </li>
                <li>
                  Completion of the booking is confirmed as completed by the Company.
                </li>
              </ul>
              <p>
                <i>For all Program Participants.</i>
                {' '}
                We may suspend, terminate or change the terms and requirements of the Program at any
                time and for any reason. A Referral Bonus already earned in accordance with the
                terms of the Program before such change, suspension or termination, will be honored.
              </p>
              <p>
                Program Participants have to be at least 18 years old. Employees, contractors and
                other personnel of the Company or its affiliates (as well as their immediate family
                members) are excluded from participation. Program Participants need to be natural
                persons. Referring Owners and Referred Owners must at all times be different people
                and unrelated. Referring Renters and Referred Renters must at all times be different
                people and unrelated. Participation in the Program is void wherever prohibited under
                applicable law.
              </p>
              <p>
                A determination on whether or not Participants have qualified for a Referral Bonus
                will be made by the Company in its sole and absolute discretion.
              </p>
              <p>
                A Referring Owner or Referring Renter can only earn a Referral Bonus a total of 12
                times. Each Referred Owner or Referred Renter can only use a Referral Link one time
                to create a Listing or make a booking, regardless of whether the Referred Owner or
                Referred Renter received or had access to separate Referral Links from different
                referring parties. The Program can only be used for personal, non-commercial
                purposes.
              </p>
              <p>
                Company uses the third-party payment platform, Refersion
                (&quot;Refersion&quot;), to process
                payments of Referral Bonuses for the Program. Program Participants will be required
                to establish a Refersion account. By using Refersion or by participating in the
                Program, you agree to be bound by Refersion’s Terms of Service. Further information
                about Refersion and its services can be found at
                {' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.refersion.com/"
                >
                  https://www.refersion.com/
                </a>
                . You expressly understand and agree that all payments and monetary transactions are
                handled by Refersion. You agree that the Company shall not be liable for any issues
                regarding financial and monetary transactions between you and any other party,
                including Refersion.
              </p>
              <p>
                The Program Participants will be responsible for any taxes or charges that may arise
                due to the earning and payout of the Referral Bonus.
              </p>
              <p>
                Referring Owners and Referring Renters are prohibited from forwarding, sharing, or
                transmitting Referral Links in violation of applicable anti-spam laws. Each
                Referring Owner and Referring Renter will indemnify and hold the Company and the
                Vancation Group harmless, from and against any claims that may arise from any
                unlawful forwarding, sharing, or transmitting of the Referral Link.
              </p>
              <p>
                With respect to the Program, Program Participants will: (i) not directly or
                indirectly (a) offer, promise, or give to any third party (including any
                governmental official or political
                party(&apos;s official, representative or candidate)),
                or (b) seek, accept, or get promised for itself of for another party, any gift,
                payment, reward, consideration, or benefit of any kind that would or could be
                construed as bribery or an illegal or corrupt practice, and (ii) comply with all
                applicable laws governing anti-bribery and corrupt gifts and practices (including
                the U.S. Foreign Corrupt Practices Act and the UK Anti-Bribery Act).
              </p>
              <p>
                The Company retains the right to, at its sole discretion, review a Program
                Participant’s compliance with the terms of the Program. We retain the right to
                investigate participation in the Program for any fraudulent activities and take any
                measures to end them. Referral Bonuses earned through fraudulent activities or
                activities in violation of these terms will be null and void and repayment may be
                requested by the Company (or, if applicable, applied as an offset or deduction
                against a Participant’s Member account).
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              20. Limitation of Liability.
            </h2>
            <div className="policy-content">
              <p>
                WE ARE NOT LIABLE AND EXPRESSLY DISCLAIM ANY LIABILITY, FOR THE CONTENT OF ANY DATA
                TRANSFERRED EITHER TO OR FROM ANY MEMBER OR OTHER USERS OF THE SERVICES. NO ORAL
                ADVICE OR WRITTEN INFORMATION GIVEN BY ANY RELATED PERSON, WILL CREATE A WARRANTY;
                NOR MAY YOU RELY ON ANY SUCH INFORMATION OR ADVICE.
              </p>
              <p>
                YOU ACKNOWLEDGE AND AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE ENTIRE
                RISK ARISING OUT OF YOUR ACCESS TO AND USE OF THE WEBSITE AND SERVICES REMAINS WITH
                YOU. YOU ARE SOLELY RESPONSIBLE FOR ALL OF YOUR COMMUNICATIONS AND INTERACTIONS WITH
                OTHER USERS AND WITH OTHER PERSONS AS A RESULT OF YOUR USE OF THE WEBSITE OR
                SERVICES, INCLUDING BUT NOT LIMITED ANY OWNERS OR RENTERS. YOU UNDERSTAND THAT
                COMPANY DOES NOT MAKE ANY ATTEMPT TO VERIFY THE STATEMENTS OF MEMBERS OR OTHER USERS
                OF THE WEBSITE OR THE SERVICES, OR TO INSPECT OR VISIT ANY RVS. COMPANY MAKES NO
                REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF MEMBERS OR OTHER USERS OF THE
                WEBSITE OR THE SERVICES. YOU AGREE TO TAKE ALL REASONABLE PRECAUTIONS IN ALL
                COMMUNICATIONS OR INTERACTIONS WITH OTHER USERS, INCLUDING BUT NOT LIMITED TO OWNERS
                AND RENTERS, PARTICULARLY IF YOU DECIDE TO MEET OFFLINE OR IN PERSON. COMPANY
                SPECIFICALLY DISCLAIMS ALL LIABILITY FOR ANY ACT OR OMISSION OF ANY OWNER, RENTER,
                OR OTHER THIRD PARTY. YOU ACKNOWLEDGE THAT COMPANY DOES NOT HAVE AN OBLIGATION TO
                CONDUCT BACKGROUND CHECKS ON ANY MEMBER OR OTHER USER.
              </p>
              <p>
                EXCEPT AS EXPRESSLY PROVIDED BELOW, NEITHER PARTY SHALL BE LIABLE IN ANY WAY TO THE
                OTHER PARTY OR ANY OTHER PERSON FOR ANY LOST PROFITS OR REVENUES, LOSS OF USE, LOSS
                OF DATA OR COSTS OF PROCUREMENT OF SUBSTITUTE GOODS, LICENSES OR SERVICES OR SIMILAR
                ECONOMIC LOSS, OR FOR ANY PUNITIVE, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR
                SIMILAR DAMAGES OF ANY NATURE, WHETHER FORESEEABLE OR NOT, UNDER ANY WARRANTY OR
                OTHER RIGHT HEREUNDER, ARISING OUT OF OR IN CONNECTION WITH THE PERFORMANCE OR
                NON-PERFORMANCE OF ANY ORDER, OR FOR ANY CLAIM AGAINST THE OTHER PARTY BY A THIRD
                PARTY, REGARDLESS OF WHETHER IT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH CLAIM OR
                DAMAGES.
              </p>
              <p>
                THESE LIMITATIONS AND EXCLUSIONS APPLY WITHOUT REGARD TO WHETHER THE DAMAGES ARISE
                FROM (1) BREACH OF CONTRACT, (2) BREACH OF WARRANTY, (3) STRICT LIABILITY, (4) TORT,
                (5) NEGLIGENCE, OR (6) ANY OTHER CAUSE OF ACTION, TO THE MAXIMUM EXTENT SUCH
                EXCLUSION AND LIMITATIONS ARE NOT PROHIBITED BY APPLICABLE LAW. IF YOU ARE
                DISSATISFIED WITH THE SITE, YOU DO NOT AGREE WITH ANY PART OF THE TERMS, OR HAVE ANY
                OTHER DISPUTE OR CLAIM WITH OR AGAINST US, ANY THIRD PARTY PROVIDER OR ANY USER OF
                THE SITE WITH RESPECT TO THESE TERMS OR THE SITE, THEN YOUR SOLE AND EXCLUSIVE
                REMEDY AGAINST US IS TO DISCONTINUE USING THE SITE. IN ALL EVENTS, OUR LIABILITY TO
                YOU OR ANY THIRD PARTY IN ANY CIRCUMSTANCE ARISING OUT OF OR IN CONNECTION WITH THE
                SITE IS LIMITED TO THE GREATER OF (A) THE AMOUNT OF FEES YOU PAY TO US IN THE TWELVE
                MONTHS PRIOR TO THE ACTION GIVING RISE TO LIABILITY OR (B) $100.00 IN THE AGGREGATE
                FOR ALL CLAIMS.
              </p>
              <p>
                THIS LIMITATION OF LIABILITY REFLECTS AN INFORMED, VOLUNTARY ALLOCATION BETWEEN THE
                PARTIES OF THE RISKS (KNOWN AND UNKNOWN) THAT MAY EXIST IN CONNECTION WITH THIS
                AGREEMENT. THE TERMS OF THIS SECTION SHALL SURVIVE ANY TERMINATION OR EXPIRATION OF
                THIS AGREEMENT.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              21. Disclaimers.
            </h2>
            <div className="policy-content">
              <p>
                The website and the Services may be subject to limitations, delays, and other
                problems inherent in the use of the Internet, mobile devices and electronic
                communications. We are not responsible for any delays, delivery failures or other
                damages resulting from such problems.
              </p>
              <p>
                THE SERVICES PROVIDED UNDER THIS AGREEMENT ARE PROVIDED ON AN AS, AS AVAILABLE
                BASIS. COMPANY DOES NOT MAKE ANY WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED,
                ERROR-FREE OR COMPLETELY SECURE; NOR DOES IT MAKE ANY WARRANTIES AS TO THE RESULTS
                THAT MAY BE OBTAINED BY USING THE SERVICES, PURCHASING A LISTING, OR RENTING AN RV.
                WITHOUT LIMITING THE FOREGOING, ANY THIRD-PARTY PRODUCT OR SERVICE PROVIDED TO USER
                HEREUNDER IS PROVIDED “AS IS“ WITHOUT ANY CONDITION OR WARRANTY WHATSOEVER. FURTHER,
                WE EXPRESSLY DISCLAIM ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, WITHOUT
                LIMITATION, NON-INFRINGEMENT, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR
                ACCURACY.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              22. Release; Indemnification.
            </h2>
            <div className="policy-content">
              <p>
                IN THE EVENT THAT YOU HAVE A DISPUTE WITH ONE OR MORE OTHER USERS (INCLUDING,
                WITHOUT LIMITATION, ANY DISPUTE BETWEEN USERS REGARDING ANY TRANSACTION OR
                USER-CONTRIBUTED CONTENT) OR ANY THIRD PARTY PROVIDER OR ANY THIRD PARTY WEBSITE
                THAT MAY BE LINKED TO OR FROM OR OTHERWISE INTERACT WITH THE WEBSITE, INCLUDING
                WITHOUT LIMITATION ANY SOCIAL MEDIA SITE, YOU HEREBY AGREE TO RELEASE, REMISE AND
                FOREVER DISCHARGE COMPANY AND ITS PARENT, SUBSIDIARIES, AND AFFILIATES COMPANIES,
                AND EACH OF THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, SHAREHOLDERS, ATTORNEYS
                AND AGENTS (COLLECTIVELY, THE “VANCATION GROUP”) FROM ANY AND ALL MANNER OF RIGHTS,
                CLAIMS, COMPLAINTS, DEMANDS, CAUSES OF ACTION, PROCEEDINGS, LIABILITIES,
                OBLIGATIONS, LEGAL FEES, COSTS, AND DISBURSEMENTS OF ANY NATURE WHATSOEVER, WHETHER
                KNOWN OR UNKNOWN, WHICH NOW OR HEREAFTER ARISE FROM, RELATE TO, OR ARE CONNECTED
                WITH SUCH DISPUTE AND/OR YOUR USE OF THE SITE.
              </p>
              <p>
                IF YOU ARE A CALIFORNIA RESIDENT, YOU WAIVE CALIFORNIA CIVIL CODE SECTION 1542,
                WHICH SAYS: “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT
                KNOW OR SUSPECT TO EXIST IN HIS FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH,
                IF KNOWN BY HIM MUST HAVE MATERIALLY AFFECTED HIS SETTLEMENT WITH THE DEBTOR.”
              </p>
              <p>
                YOU HEREBY AGREE TO INDEMNIFY, DEFEND AND HOLD EACH MEMBER OF VANCATION LLC HARMLESS
                FROM AND AGAINST ANY AND ALL LIABILITY AND COSTS INCURRED BY VANCATION LLC IN
                CONNECTION WITH ANY CLAIM ARISING OUT OF YOUR USE OF THE WEBSITE OR OTHERWISE
                RELATING TO THE BUSINESS WE CONDUCT ON THE WEBSITE (INCLUDING, WITHOUT LIMITATION,
                ANY POTENTIAL OR ACTUAL COMMUNICATION, TRANSACTION OR DISPUTE BETWEEN YOU AND ANY
                OTHER USER OR THIRD PARTY), ANY CONTENT POSTED BY YOU OR ON YOUR BEHALF OR POSTED BY
                OTHER USERS OF YOUR ACCOUNT TO THE WEBSITE, ANY USE OF ANY TOOL OR SERVICE PROVIDED
                BY A THIRD PARTY PROVIDER, ANY USE OF A TOOL OR SERVICE OFFERED BY US THAT INTERACTS
                WITH A THIRD PARTY WEBSITE, INCLUDING WITHOUT LIMITATION ANY SOCIAL MEDIA SITE OR
                ANY BREACH BY YOU OF THESE TERMS OR THE REPRESENTATIONS, WARRANTIES AND COVENANTS
                MADE BY YOU HEREIN, INCLUDING WITHOUT LIMITATION, ATTORNEYS’ FEES AND COSTS. YOU
                SHALL COOPERATE AS FULLY AS REASONABLY REQUIRED IN THE DEFENSE OF ANY CLAIM.
              </p>
              <p>
                WE RESERVE THE RIGHT, AT OUR OWN EXPENSE, TO ASSUME THE EXCLUSIVE DEFENSE AND
                CONTROL OF ANY MATTER OTHERWISE SUBJECT TO INDEMNIFICATION BY YOU AND YOU SHALL NOT
                IN ANY EVENT SETTLE ANY MATTER WITHOUT OUR WRITTEN CONSENT.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              23. Arbitration; Dispute Resolution.
            </h2>
            <div className="policy-content">
              <p>
                Company’s right to amend this Agreement, in whole or in part, does not apply to this
                “Disputes; Arbitration“ section. The version of this “Arbitration” section in effect
                on the date you last accepted the Agreement controls.
              </p>
              <p>
                Any and all claims will be resolved by binding arbitration, rather than in court,
                except you may assert claims on an individual basis in small claims court if they
                qualify. This includes any claims you assert against us, our subsidiaries, users or
                any companies offering products or services through us (which are beneficiaries of
                this arbitration agreement). This also includes any claims that arose before you
                accepted the terms of this Agreement regardless of whether prior versions of the
                Agreement required arbitration.
              </p>
              <p>
                Prior to beginning an arbitration proceeding, you must send a letter describing your
                claims to the Company. If we have claims against you, we will give you notice at the
                email address or street address you have provided. If the parties are not able to
                resolve the matter, the party pursuing arbitration must file a case according to the
                rules set forth by the American Arbitration Association (AAA). Arbitrations will be
                conducted by the AAA under its rules, including the AAA Arbitration Consumer Rules
                (together, the “AAA Rules”). Payment of all filing, administration and arbitrator
                fees will be governed by the AAA’s rules.
              </p>
              <p>
                You and Company acknowledge and agree that we are each waiving the right to a trial
                by jury as to all arbitrable claims. You and Company acknowledge and agree that we
                are each waiving the right to participate as a plaintiff or class member in any
                purported class action lawsuit, class-wide arbitration, private attorney-general
                action, or any other representative proceeding as to all claims. Further, unless you
                and Company both otherwise agree in writing, the arbitrator may not consolidate more
                than one party’s claims and may not otherwise preside over any form of any class or
                representative proceeding.
              </p>
              <p>
                Arbitration Hearing/Location. You agree that any required arbitration hearing will
                be conducted in either (a) Washoe County; (b) via phone or video conference; or (e)
                for any claim or counterclaim under $25,000, by solely the submission of documents
                to the arbitrator.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              24. Termination; Compliance with Legal Requests.
            </h2>
            <div className="policy-content">
              <p>
                If, in our sole discretion, any Member submits unsuitable material to our website or
                into our database, is not abiding by local regulations, misuses the website or our
                Systems or is in material breach of this Agreement, we reserve the right to limit
                the Member’s use of the website, impact the Member’s Listing(s) search position,
                and/or terminate such Member’s Listing immediately without refund. In addition, if
                we become aware of or receive a complaint or a series of complaints from any User or
                other third party regarding a Member’s listing or rental practices that, in our sole
                discretion, warrants the immediate removal of such Member’s Listing from the
                website, then we may immediately terminate such Member’s Listing(s) without notice
                to the Member and without refund. We assume no duty to investigate complaints.
                Finally, if any Member is abusive or offensive to any employee or representative of
                Vancation LLC, we reserve the right to terminate such Member’s Listing(s) or
                subscription(s) immediately without refund. In addition to reserving the right to
                terminate any Listing, Company reserves all rights to respond to any violation of
                this Agreement or misuse of the website by, including, but not limited to, hiding a
                Listing from the search results and removing or changing information that may be
                false or misleading.
              </p>
              <p>
                You agree that monetary damages may not provide a sufficient remedy to Company for
                your violation of this Agreement and you consent to Company obtaining injunctive or
                other equitable relief for such violations. Company may release Member Content and
                other information about you if required by law or subpoena, or if the information is
                necessary or appropriate to release to address an unlawful or harmful activity.
                Company is not required to provide any refund to you if you are terminated as a
                Member or user of the Services because you violated this Agreement.
              </p>
              <p>
                A Member or other User of the website or Services may terminate this Agreement with
                the Company at any time with written notice of such party’s intent to cancel.
                Company may terminate this Agreement at any time for any reason, with no notice to a
                Member or other User of the website or Services. If you or we terminate this
                Agreement, the clauses of this Agreement that reasonably should survive termination
                of the Agreement will remain in effect.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              25. Special Terms for Mapbox.
            </h2>
            <div className="policy-content">
              <p>
                Mapbox Terms of Use. Users use of the website and Services is further subject to
                Mapbox’s Terms of Service for Mapbox maps and API set forth at the following URL:
                {' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.mapbox.com/legal/tos"
                >
                  https://www.mapbox.com/legal/tos
                </a>
                {' '}
                (or such other URL as may be updated by Mapbox).
              </p>
              <p>
                Google Maps Legal Notices. The legal notices set forth at the following URLs
                supplement the terms and conditions of this Agreement, and are binding on the Users:
                (i) Google Privacy Policy at
                {' '}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.mapbox.com/legal/privacy"
                >
                  https://www.mapbox.com/legal/privacy
                </a>
                {' '}
                (or such other URL as may be updated by Mapbox).
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              26. Reservation of Rights; Use of Marks.
            </h2>
            <div className="policy-content">
              <p>
                Company expressly reserves all rights in the website, the Services, and all other
                materials provided by Company hereunder not specifically granted to a User. It is
                acknowledged that all right, title and interest in the website, the Services, and
                all other materials provided by Company hereunder, any update, adaptation,
                translation, customization or derivative work thereof, and all intellectual property
                rights therein will remain with Company (or third party suppliers, if applicable)
                and that the Services and all other materials provided by Company hereunder are
                licensed and not “sold” to Party. Names, logos, and other materials displayed on the
                website and the Services constitute trademarks, trade names, service marks or logos
                (“Marks”) of Company or other entities. No User of the website or the Services is
                authorized to use any such Marks. Ownership of all such Marks and the goodwill
                associated therewith remains with Company or those other entities. Any use of
                third-party software provided in connection with the Services will be governed by
                such third parties’ licenses and not by this Agreement.
              </p>
            </div>
          </div>
          <div className="policy-item">
            <h2 className="text-headline font-700 mb-16">
              27. General Provisions.
            </h2>
            <div className="policy-content">
              <p>
                Nondiscrimination. At Vancation we are committed to providing an RV and campervan
                rental experience built on a foundation of inclusiveness, safety and respect. Our
                services are available to renters and owners without regard to race, color,
                ethnicity, religion, national origin, ancestry, disability, sex, gender identity,
                sexual orientation or marital status. We expect all users to demonstrate respect and
                tolerance in all interactions when it comes to the advertisement and rental of a
                listed RV, and we reserve the right to remove any user from the Vancation community
                who fails to abide by these principles.
              </p>
              <p>
                No Partnership. Nothing contained in this Agreement places you and Company in the
                relationship of principal and agent, master and servant, partners, or joint
                venturers. Neither party has, expressly or by implication, or may represent itself
                as having, any authority to make contracts or enter into any agreements in the name
                of the other party, or to obligate or bind the other party in any manner whatsoever.
              </p>
              <p>
                Governing Law. These Terms are governed by the Federal Arbitration Act, 9 U.S.C. § 1
                et seq. (“FAA”), AAA Rules, federal arbitration law, and for U.S. residents, the
                laws of the state in which you reside (as determined by the billing address you have
                provided us), without regard to conflict of laws principles. It is the intent of the
                parties that the FAA and AAA Rules shall preempt all state laws to the fullest
                extent permitted by law.
              </p>
              <p>
                Revisions to Website; Revisions to this Agreement. This version of the Agreement
                became effective on the date set forth above and this version amends the version
                effective before such date. We reserve the right, in our sole discretion, to amend
                this Agreement, in whole or in part, at any time. Notification of any amendment will
                be posted on the website by the indication of the last amendment date at the top of
                this Agreement and will be effective immediately. When you log-in or otherwise
                continue to use the website or the Services, you will be using the website and the
                Services subject to this Agreement (as updated). Should any modification or
                amendment to this Agreement not be effective, for whatever reason, the prior version
                of this Agreement shall remain in effect between you and Company and shall be
                controlling. Company reserves the right in its sole discretion to review, improve,
                modify, terminate, or discontinue, temporarily or permanently, the website, the
                Services or any content or information available thereon with or without notice to
                you or any user. You agree that Company shall not be liable to you or any third
                party for any modification or discontinuance of the website or the Services.
              </p>
              <p>
                Headings. The headings contained herein are for convenience only and are not part of
                this Agreement.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <Footer />
  </>
);

export default TermsOfService;
