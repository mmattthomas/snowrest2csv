

var config = {

    options: {
        resthost: 'ncrdev2.service-now.com',
    },
    calls: [
        {
            key: "customer_account",
            table: "customer_account",
            query: "u_work_unit%3DDigital%20Insight%5Eu_account_type%3Dcustomer",
            //fields: ["u_customer_type", "u_tax_id", "u_fdic_number", "u_potential_end_users", "u_tier", "u_master_customer_number", "name", "u_active", "u_short_name", "u_fi_type", "u_ncua_id", "u_routing_transit_number", "u_di_number"],
            headerFields: "COMPANY_ID,RN_CREATE_DATE,RN_CREATE_USER,RN_EDIT_DATE,RN_EDIT_USER,COMPANY_NAME,ADDRESS_1,ZIP,PHONE,FAX,WWW,PARENT_COMPANY_ID,STATE_,CITY,TYPE,RSM_OVERRIDE,DUNS,AM_ID,REGULATORY_AGENCY,FI,DI_NUMBER,IB_REGISTRATION_TYPE,SHORT_NAME,BUSINESS_HOURS,AFTER_HOURS,BILL_PAYMENT_SPONSOR_ID,NO_OF_FI_CUSTOMERS,ASSET_SIZE,ROUTING_TRANSIT_NUMBER,ACTIVE,TAX_ID,MAILING_ADDRESS_LINE_ONE,MAILING_ADDRESS_CITY,MAILING_ADDRESS_STATE,MAILING_ADDRESS_ZIP,TIER,ACTIVE_STATUS,FDIC_NUMBER,INTERFACE_SUPPORT_TYPE,MONITORED_DOMAIN,LOADED_IN_SKYMON,SUPPORT_SERVICE_LEVEL,OMIT_MONITORING,CUSTOMER_CLASSIFICATION,ACTUAL_DEACTIVATION_DATE,PLANNED_DEACTIVATION_DATE,DPV_ID,DPV_PRODUCT_ID,DPV_SERVICE_BUREAU_ID,DPV_HOSTING_TYPE,BILL_PAYMENT_CM_SPONSOR_ID,BILLING_CLOSED_DATE,PREPROD_LOADED_IN_SKYMON,PREPROD_OMIT_MONITORING,BILL_PAY_COST_METHOD,IB_STAGING_URL,TEMP_BP_SPONSOR_ID,STAGING_SKYMON_STATUS,COMBINED_REGISTRATION,EMAIL_COLLECTION,EMAIL_CAPTURE,SRT,ALERTS,RETENTION_EMAILS,LENDING_SALES_REP,MONITORED_DOMAIN_OWNER,OL_INTERFACE_SERVICE_NAME,MYDI_EXCLUDE_FROM_NEW_INCIDENT,OMIT_MONITORING_REASON,PREPROD_OMIT_REASON,ACTIVE_DPV_ID,NCUA_ID,CEU,CUSTOMER_CENTRAL_ID,COMPANY_TYPE_F,ONLINE_CHAT_ENABLED,ONLINE_KB_ENABLED,COMPANY_CLASSIFICATION",
            restFields: "sys_id,sys_created_on,sys_created_by,sys_updated_on,sys_updated_by,name,street,zip,phone,fax_phone,website,parent,state,city,u_customer_type,,u_duns,u_relationship_manager,,u_fi_type,u_di_number,u_ib_registration_type,u_short_name,u_business_hrs,u_after_hrs,u_bp_sponsor_ib,u_potential_end_users,u_asset_size,u_routing_transit_number,u_active,u_tax_id,u_alt_street,u_alt_city,u_alt_state,u_alt_zip,u_tier,u_active,u_fdic_number,u_interface_support_type,u_monitoring_domain,u_loaded_skymon,u_support_service_level,u_omit_monitoring,u_customer_classification,u_actual_deactivation_date,u_planned_deactivation_date,u_dpv,u_dpv_product,u_dpv_service_bureau,u_dpv_hosting_type,u_bp_sponsor_bt,u_billing_closed_date,u_preprod_loaded_skymon,u_preprod_omit_monitoring,u_bill_pay_cost_method,u_ib_staging_url,u_bp_sponsor_bfs,u_staging_status,u_combined_registration,u_email_collection,u_email_capture,u_srt,u_alerts,u_retention_emails,,u_monitored_domain_owner,u_ol_interface_service_name,,u_omit_monitoring_reason,u_preprod_omit_reason,,u_ncua_id,u_competitive_end_users,u_customer_central_id,,u_online_chat_enabled,u_online_kb_enabled,u_company_classification",
            limit: 20
        },
        {
            
            key: "customer_account_lite",
            table: "customer_account",
            query: "u_work_unit%3DDigital%20Insight%5Eu_account_type%3Dcustomer",
            //fields: ["u_customer_type", "u_tax_id", "u_fdic_number", "u_potential_end_users", "u_tier", "u_master_customer_number", "name", "u_active", "u_short_name", "u_fi_type", "u_ncua_id", "u_routing_transit_number", "u_di_number"],
            headerFields: "Type,Tax_ID,FDIC_Number,No_of_FI_Customers,Tier,NCR_Master_Customer_Number,Company_Name,Active,Short_Name,FI,NCUA_ID,Routing_Transit_Number,DI_Number",
            restFields: "u_customer_type,u_tax_id,u_fdic_number,u_potential_end_users,u_tier,u_master_customer_number,name,u_active,u_short_name,u_fi_type,u_ncua_id,u_routing_transit_number,u_di_number",
            limit: 20
        },
        {
            key: "product_lite",
            table: "u_cmdb_ci_di_product",
            queryparams: "u_active%3Dtrue",
            headerFields: "Code_",
            restFields: "u_product_code",
            limit: 20
        }, 
        {
            key: "product",
            table: "u_cmdb_ci_di_product",
            queryparams: "",
            headerFields: "Product_Id,Rn_Descriptor,Rn_Create_Date,Rn_Create_User,Rn_Edit_Date,Rn_Edit_User,Product_Name,Code_,Type,Product_Manager_Id,Product_Class_Id,Product_Number,Product_Category_Id,Sellable,Supportable,MyDI_Early_Support",
            restFields: "sys_id,display_name,sys_created_on,sys_created_by,sys_updated_on,sys_updated_by,name,u_product_code,type,owner,u_implementation_class_id,model_number,cmdb_model_category,u_sellable,u_supportable,u_extranet_early_support",
            limit: 20
        }, 
        {
            key: "asset",
            table: "u_alm_asset_di_customer_asset",
            queryparams: "",
            headerFields: "Beta,Company_Id,Contract Start,Customer_Contract_Id,Deactivated_Date,Delivery_Date,FI_Vendor_Id,Live_Date,Product_Id,Project_Id,Status,Status_Detail_Id",
            restFields: "u_beta,account,u_contract_start_date,u_contract_link,u_deactivated,u_delivery_date,u_solution_provider_product,u_live_date,model,u_program,install_status,substatus",
            limit: 20
        }
    ]

};

module.exports = config;

 