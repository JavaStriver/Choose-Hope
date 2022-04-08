package com.aws.lambda.online;

import com.aws.lambda.online.data.*;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import java.sql.*;
import java.util.ArrayList;

public class MySqlTest implements RequestHandler<RequestDetails, ArrayList<ResponseDetails>> {
    private LambdaLogger logger;

    public ArrayList<ResponseDetails> handleRequest(RequestDetails requestDetails, Context arg1) {

        logger = arg1.getLogger();
        ArrayList<ResponseDetails> responseDetails = null;
        try {
            responseDetails = getDetails(requestDetails, logger);
        } catch (SQLException sqlException) {
            logger.log("Caught SQL exception: " + sqlException.getMessage());
        } catch (Exception e) {
            logger.log("Caught exception: " + e.getMessage());
        }
        return responseDetails;
    }

    private ArrayList<ResponseDetails> getDetails(RequestDetails requestDetails, LambdaLogger logger) throws SQLException {
        ArrayList<ResponseDetails> responseDetailsArr = new ArrayList<ResponseDetails>();
        Connection connection = getConnection();
        Statement statement = connection.createStatement();

        String serviceList = "";
        for(String serviceLocation : requestDetails.getServiceLocation()){
            serviceList=serviceList.concat("\""+serviceLocation+"\",");
        }

        String finalServiceList = serviceList.substring(0, serviceList.length() - 1);

        String sql1 = "SELECT * FROM reconnectprogram.`reconnect-victoria` where Service_category =\"" +requestDetails.getServiceCategory()+ "\""  + "and Service_Location in ( " +finalServiceList+" )";

        logger.log("sql1 : "+ sql1);
        ResultSet rs = statement.executeQuery(sql1);
        while (rs.next() ) {
            ResponseDetails responseDetails = new ResponseDetails();
            responseDetails.setServiceCategory(rs.getString("Service_category"));
            responseDetails.setServiceName(rs.getString("Service_Name"));
            responseDetails.setServiceAddress(rs.getString("Service_Address"));
            responseDetails.setServiceLocation(rs.getString("Service_Location"));
            responseDetails.setServiceContactTelephone1(rs.getString("Service_contact_telephone1"));
            responseDetails.setServiceContactTelephone2(rs.getString("Service_contact_telephone2"));
            responseDetails.setEmailAddress(rs.getString("Email_address"));
            responseDetails.setServiceWebsiteAddress(rs.getString("Service_website_address"));
            responseDetails.setLatitude(rs.getDouble("Latitude"));
            responseDetails.setLongitude(rs.getDouble("Longitude"));
            responseDetails.setDescription(rs.getString("description"));
            responseDetails.setOpenHours(rs.getString("open_hours"));
            responseDetails.setPostcode(rs.getInt("Postcode"));
            responseDetailsArr.add(responseDetails);
        }


        logger.log("Successfully executed query.");
        rs.close();
        connection.close();
        return responseDetailsArr;
    }


    //mysql Connect Statement
    private Connection getConnection() throws SQLException {
        logger.log("Invoked JDBCSample.getCurrentTime \n");
        String url = "jdbc:mysql://choose-hope-database.cndnnzv1rkmb.us-east-1.rds.amazonaws.com:3306/reconnectprogram";
        String username = "admin";
        String password = "kuljasimsim";
        Connection conn = DriverManager.getConnection(url, username, password);
        return conn;
    }
}