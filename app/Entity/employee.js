import { isEmptyString } from '../helpers/stringHelper';
import Email from './email';

export default class Employee {
  constructor(givenName, familyName, email, bio, address, telephone, jobTitle) {
    if (isEmptyString(givenName)) {
      throw {
        message: 'Please fill in the given name, cannot be empty',
      };
    }
    if (isEmptyString(familyName)) {
      throw {
        message: 'Please fill in the family name, cannot be empty',
      };
    }

    if (email instanceof Email) {
      this.email = email;
    } else {
      throw {
        message: 'Email should be of class Email',
      };
    }

    this.givenName = givenName;
    this.familyName = familyName;
    this.bio = bio ?? `Meet Jonas, a tech enthusiast hailing from the charming town of Brasschaat. With a love for all things tech-related, Jonas has carved his path in the ever-evolving world of technology.

    At the age of 24, Jonas has already established himself as a keen observer of technological advancements. He is passionate about exploring the latest gadgets, software, and innovations that shape our modern lives. Jonas' insatiable curiosity and willingness to delve into the intricacies of technology have earned him a reputation as the go-to person among family and friends for tech advice and recommendations.
    
    In his free time, you'll often find Jonas tinkering with electronics, experimenting with coding, or engaging in spirited discussions about the future of AI, robotics, and automation. His keen interest in these areas has led him to consider pursuing a career in technology, where he hopes to contribute his ideas and skills to push the boundaries of innovation.
    
    Beyond his tech-centric endeavors, Jonas is a devoted dog owner, cherishing the companionship and loyalty of his four-legged friend. He values quality time with his family, comprising three other members who share his passion for exploring new technologies and its impact on society.
    
    Jonas' journey into the world of technology is just beginning, and with his determination and enthusiasm, he is bound to leave a mark in this fast-paced and ever-changing landscape.`;
    this.address = address ?? 'Essensteenweg 31';
    this.telephone = telephone ?? '+32 492 826 310';
    this.jobTitle = jobTitle ?? 'Software Engineer';
  }
}
