package com.aws.lambda.online.data;

public class ResponseDetails  {
    private String serviceCategory;
    private String serviceName;
    private String serviceAddress;
    private String serviceLocation;
    private String serviceContactTelephone1;
    private String serviceContactTelephone2;
    private String serviceWebsiteAddress;
    private String EmailAddress;
    private Double latitude;
    private Double longitude;
    private String description;
    private String openHours;
    private Integer postcode;

    public String getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceAddress() {
        return serviceAddress;
    }

    public void setServiceAddress(String serviceAddress) {
        this.serviceAddress = serviceAddress;
    }

    public String getServiceLocation() {
        return serviceLocation;
    }

    public void setServiceLocation(String serviceLocation) {
        this.serviceLocation = serviceLocation;
    }

    public String getEmailAddress(){return EmailAddress;}
    public void setEmailAddress(String EmailAddress){ this.EmailAddress = EmailAddress;}

    public String getServiceContactTelephone1() {
        return serviceContactTelephone1;
    }

    public void setServiceContactTelephone1(String serviceContactTelephone1) {
        this.serviceContactTelephone1 = serviceContactTelephone1;
    }

    public String getServiceContactTelephone2() {
        return serviceContactTelephone2;
    }

    public void setServiceContactTelephone2(String serviceContactTelephone2) {
        this.serviceContactTelephone2 = serviceContactTelephone2;
    }

    public String getServiceWebsiteAddress() {
        return serviceWebsiteAddress;
    }

    public void setServiceWebsiteAddress(String serviceWebsiteAddress) {
        this.serviceWebsiteAddress = serviceWebsiteAddress;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOpenHours() {
        return openHours;
    }

    public void setOpenHours(String openHours) {
        this.openHours = openHours;
    }

    public Integer getPostcode() {
        return postcode;
    }

    public void setPostcode(Integer postcode) {
        this.postcode = postcode;
    }
}