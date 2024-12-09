create table student(
   std_id varchar(30) primary key,
    grade int,
    password varchar(20) not null,
    email varchar(20) unique,
    local varchar(20),
    name varchar(10),
    sex enum('남','여')
);

create table school(
   sch_id int auto_increment primary key,
    sch_name varchar(10) unique,
    sch_email varchar(20) unique
);

create table shc_auth(
   sch_email varchar(30),
    std_id varchar(20),
    sch_name varchar(20),
    un_std boolean,
    primary key(sch_email, std_id),
    foreign key(std_id) references student(std_id)
);

create table matching(
   matching_id int auto_increment primary key,
    std_id varchar(20),
    sch_id int,
    foreign key(std_id) references student(std_id),
    foreign key(sch_id) references school(sch_id)
);

create table schedule(
   schd_id int auto_increment primary key,
    sch_id int,
    schd_name varchar(20),
    start_day date,
    end_dat date,
    schd_kind varchar(20)
);

create table message(
   msg_id int auto_increment primary key,
    std_id varchar(20),
    text varchar(500),
    foreign key(std_id) references student(std_id)
);

create table post(
   post_id int auto_increment primary key,
    title varchar(30),
    std_id varchar(20),
    text varchar(1000),
    post_day date,
    post_status enum('자유','행사','모집'),
    foreign key(std_id) references student(std_id)
);
