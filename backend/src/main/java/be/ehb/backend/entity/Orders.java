package be.ehb.backend.entity;

import javax.persistence.*;

@Entity
public class Orders {
    @Id
    private int id;

    private int userID;

    public Orders() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
}
