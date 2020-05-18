import React, { useState } from "react"
import { FlatList } from "react-native"
import InfoItem from "../components/InfoItem"
import Container from "../components/Container"

export default function Policy() {
    const [data] = useState([
        { heading: "Welcome", content: "Thank you for visiting our store. Your privacy is important to us. To better protect your privacy we provide this notice explaining our online information practices and the choices you can make about the way your information is collected and used at our site." },
        { heading: "The Information We Collect", content: "You provide specific personal information during the purchase of goods and/or services from our site. The information includes: your name, address, e-mail address, telephone number, payment information and your interest in specific types of products and/or services. We may also collect certain non-personal information including the type of browser you are using (e.g. Netscape, Internet Explorer), the type of operating system you are using (e.g. Windows 95, Mac OS) and the domain name of your Internet service provider (e.g. America Online, Earthlink)." },
        { heading: "How We Use the Information", content: "We use the information you provide about yourself to fulfill your order for our goods and/or services, to respond to your inquiries about your order and to notify you about the status of your order. From time to time we may also send you additional information about our products and/or services in special promotional mailings. If you do not wish to receive these special mailings please make sure to check the box that says “Check this box if you do not wish to receive special promotional mailings”, which is located at the bottom of the page where you fill in your shipping and billing addresses. If you wish to be removed from our mailing at any time please contact our Customer Service Department. The non-personal information gathered may be used to improve the design and content of our site and in the aggregate to analyze site usage. We may disclose personal information in response to legal process (e.g. in response to a court order or subpoena). We also may disclose such information in response to a law enforcement agency’s requests. And finally we may disclose personal information in response to a charge-back inquiry from our merchant bank about your payment for goods and/or services. We will not sell or transfer personally identifiable information provided to us to parties outside of our company except as described above." },
        { heading: "Collection of Information by Third Party Sites", content: "Our site may contain links to other sites whose information practices may be different than ours. Visitors should consult the other sites’ privacy notices as we have no control over information that is submitted to, or collected by, these third parties." },
        { heading: "Special Note For Parents ", content: "While we encourage children to consult with their parents before furnishing personal data, parents should supervise their children’s online activities and consider using parental control tools available from online services and software manufacturers. These tools can prevent children from disclosing their name, address and other personal information without parental permission. " },
        { heading: "Special Note For Kids", content: "Be sure to ask your mom or dad for permission before sending any information about yourself to us (or anyone else) over the Internet." }
    ])

    return (
        <Container pd={true}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <InfoItem data={item} />
                )}
                keyExtractor={item => item.heading}
            />
        </Container>
    )
}