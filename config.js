

var config = {

    options: {
        resthost: 'ncrdev2.service-now.com',
    },
    calls: [
        {
            key: "customer_account",
            table: "customer_account",
            query: "work_unit%3Ddigital%20insight",
            //fields: ["u_customer_type", "u_tax_id", "u_fdic_number", "u_potential_end_users", "u_tier", "u_master_customer_number", "name", "u_active", "u_short_name", "u_fi_type", "u_ncua_id", "u_routing_transit_number", "u_di_number"],
            fields: "u_customer_type,u_tax_id,u_fdic_number,u_potential_end_users,u_tier,u_master_customer_number,name,u_active,u_short_name,u_fi_type,u_ncua_id,u_routing_transit_number,u_di_number",
            limit: 10
        },
        {
            key: "product",
            table: "u_cmdb_ci_di_product",
            queryparams: "",
            fields: "full_name,u_supportable,u_active,u_product_code,type",
            limit: 10
        }
    ]

};

module.exports = config;

 