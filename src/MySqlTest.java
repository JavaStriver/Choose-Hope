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
        Statement statement = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                ResultSet.CONCUR_READ_ONLY);
        String sql1 = "SELECT * FROM reconnectprogram.`reconnect-victoria` where Service_category =\"" +requestDetails.getServiceCategory()+ "\""  + "and if (1="+requestDetails.getPostCode()+ ",1=1, Postcode ="+requestDetails.getPostCode()+")";
        ResultSet rs = statement.executeQuery(sql1);

        int size =0;
        if (rs != null)
        {
            rs.last();    // moves cursor to the last row
            size = rs.getRow(); // get row id
            rs.beforeFirst();
        }
        logger.log("rs : "+ size);

        if ( size >= 1 ){
            logger.log("sql1 : "+ sql1);
            while (rs.next()) {
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
            rs.close();
        }
        else{
            String sql2 = "SELECT * FROM reconnectprogram.`reconnect-victoria`  where Service_category = \"" +requestDetails.getServiceCategory()+"\" and postcode between ("+requestDetails.getPostCode()+"-100) and ("+requestDetails.getPostCode()+"+100) order by Service_Location desc ,Postcode asc ";
            ResultSet rs2 = statement.executeQuery(sql2);
            logger.log("sql2 : "+ sql2);
            while (rs2.next() ) {
                ResponseDetails responseDetails = new ResponseDetails();
                responseDetails.setServiceCategory(rs2.getString("Service_category"));
                responseDetails.setServiceName(rs2.getString("Service_Name"));
                responseDetails.setServiceAddress(rs2.getString("Service_Address"));
                responseDetails.setServiceLocation(rs2.getString("Service_Location"));
                responseDetails.setServiceContactTelephone1(rs2.getString("Service_contact_telephone1"));
                responseDetails.setServiceContactTelephone2(rs2.getString("Service_contact_telephone2"));
                responseDetails.setEmailAddress(rs2.getString("Email_address"));
                responseDetails.setServiceWebsiteAddress(rs2.getString("Service_website_address"));
                responseDetails.setLatitude(rs2.getDouble("Latitude"));
                responseDetails.setLongitude(rs2.getDouble("Longitude"));
                responseDetails.setDescription(rs2.getString("description"));
                responseDetails.setOpenHours(rs2.getString("open_hours"));
                responseDetails.setPostcode(rs2.getInt("Postcode"));
                responseDetailsArr.add(responseDetails);
            }
            rs2.close();
        }
        logger.log("Successfully executed query.");
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