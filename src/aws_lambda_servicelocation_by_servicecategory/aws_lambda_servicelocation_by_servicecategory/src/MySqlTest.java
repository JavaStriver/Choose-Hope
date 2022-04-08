package com.aws.lambda.online;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.aws.lambda.online.data.RequestDetails;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class MySqlTest implements RequestHandler<RequestDetails, HashMap<String, ArrayList<String>>> {
    private LambdaLogger logger;

    public HashMap<String, ArrayList<String>> handleRequest(RequestDetails requestDetails, Context arg1) {

        logger = arg1.getLogger();
        HashMap<String,ArrayList<String>> responseDetailsArr = new HashMap<String,ArrayList<String>>();    ;
        ArrayList<String> responseDetails = null;

        try {
            responseDetails = getDetails(requestDetails, logger);
            responseDetailsArr.put("serviceLocation",responseDetails);
        } catch (SQLException sqlException) {
            logger.log("Caught SQL exception: " + sqlException.getMessage());
        } catch (Exception e) {
            logger.log("Caught exception: " + e.getMessage());
        }
        return responseDetailsArr;
    }

    private ArrayList<String> getDetails(RequestDetails requestDetails, LambdaLogger logger) throws SQLException {
        ArrayList<String> responseDetailsArr = new ArrayList<String>();
        Connection connection = getConnection();
        Statement statement = connection.createStatement();
        String sql1 = "SELECT distinct Service_Location FROM reconnectprogram.`reconnect-victoria` where Service_category = \"" +requestDetails.getServiceCategory()+"\"";

        ArrayList<String> serviceLocation = new ArrayList<String>();
        logger.log("sql1 : "+ sql1);
        ResultSet rs = statement.executeQuery(sql1);
        while (rs.next()) {
            serviceLocation.add(rs.getString("Service_location"));
        }
        logger.log("Successfully executed query.");
        rs.close();
        connection.close();
        return serviceLocation;
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
