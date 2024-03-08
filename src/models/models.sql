CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email  VARCHAR(250) NOT NULL ,
    password  VARCHAR(250) NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 );

CREATE TABLE states (
    state_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    state_name VARCHAR(100) NOT NULL ,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    email  VARCHAR(250) NOT NULL ,
    phone_no  VARCHAR(250) NOT NULL ,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);


CREATE TABLE services (
    serivce_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    serivceName VARCHAR(100) NOT NULL,
    description TEXT  DEFAULT NULL,
    creator_user_id INT,
    state_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    CONSTRAINT `creator_user_id` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`),
    CONSTRAINT `state_id` FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`)
);



CREATE TABLE teams (
    team_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    description TEXT  DEFAULT NULL,
    team_creator_user_id INT,
    team_creator_state_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
    CONSTRAINT `team_creator_user_id` FOREIGN KEY (`team_creator_user_id`) REFERENCES `users` (`user_id`),
    CONSTRAINT `team_creator_state_id` FOREIGN KEY (`team_creator_state_id`) REFERENCES `states` (`state_id`)
);
