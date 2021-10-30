create table if not exists goods
(
    id serial primary key,
    name varchar(255),
    price_per_unit float,
    supplier_id int,
    foreign key (supplier_id) references supplier (id)
    );
