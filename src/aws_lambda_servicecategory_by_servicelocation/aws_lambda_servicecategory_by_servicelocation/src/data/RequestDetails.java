package com.aws.lambda.online.data;

import java.util.ArrayList;

public class RequestDetails {
    private String serviceCategory;
    private ArrayList<String> serviceLocation;

    public String getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public ArrayList<String> getServiceLocation() {
        return serviceLocation;
    }

    public void setServiceLocation(ArrayList<String> serviceLocation) {
        this.serviceLocation = serviceLocation;
    }
}
