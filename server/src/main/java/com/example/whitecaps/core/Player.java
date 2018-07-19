package com.example.whitecaps.core;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Objects;
import java.util.Date; 
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;;

@Entity
@Table(name = "players")
@NamedQueries(
    {
        @NamedQuery(
            name = "com.example.whitecaps.core.Player.findAll",
            query = "SELECT p FROM Player p"
        ),

        @NamedQuery(
            name = "com.example.whitecaps.core.Player.search",
            query = "SELECT p FROM Player p WHERE "
                + "lower(p.searchBlob)  LIKE lower(concat('%', :term,'%'))"
        )
        // @NamedQuery(    if we don't like the search blob we can revert to searching all columns manually
        //     name = "com.example.whitecaps.core.Player.search",
        //     query = "SELECT p FROM Player p WHERE "
        //     + "lower(p.name)  LIKE lower(concat('%', :term,'%')) OR "
        //     + "lower(p.number)  LIKE lower(concat('%', :term,'%')) OR "
        //     + "lower(p.position)  LIKE lower(concat('%', :term,'%')) OR "
        //     + "lower(p.nationality)  LIKE lower(concat('%', :term,'%')) OR "
        //     + "lower(p.birthPlace)  LIKE lower(concat('%', :term,'%')) OR "
        //     + "lower(p.height)  LIKE lower(concat('%', :term,'%')) OR "
        //     + "lower(p.weight)  LIKE lower(concat('%', :term,'%')) OR "
        //     + "lower(p.dob)  LIKE lower(concat('%', :term,'%')) "
        // )
    })

public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number")
    private long number;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "pos", nullable = false)
    private String position;

    @Column(name = "nat")
    private String nationality; 

    @Column(name = "birthplace")
    private String birthPlace; 

    @Column(name = "height", precision=10, scale=2)
    private Double height;

    @Column(name = "weight")
    private Long weight;

    @Temporal(TemporalType.DATE)
    @Column(name = "dob")
    private Date dob;

    @Column(name = "searchblob")
    private String searchBlob;

    // delimiter for the search blob
    public static String delimiter = ",";


    public Player() {
    }

    public Player(long number, String name, String pos, String nat, String birthPlace, Double height, Long weight, Date dob, String searchBlob) {
        this.number = number;
        this.name = name;
        this.position = pos;
        this.nationality = nat;
        this.birthPlace = birthPlace;
        this.height = height;
        this.weight = weight;
        this.dob = dob;
        this.searchBlob = searchBlob;
    }

    @JsonProperty
    public long getId() {
        return number;
    }

    public void setId(long number) {
        this.number = number;
    }

    @JsonProperty
    public String getName() {
        return name;
    }

    public void setlName(String name) {
        this.name = name;
    }

    @JsonProperty
    public String getPosition() {
        return position;
    }

    public void setPosition(String pos) {
        this.position = pos;
    }

    @JsonProperty
    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nat) {
        this.nationality = nat;
    }

    @JsonProperty
    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }

    @JsonProperty
    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    @JsonProperty
    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    @JsonProperty
    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    @JsonIgnore
    public String getSearchBlob() {
        return searchBlob;
    }

    public void setSearchblob(String searchBlob) {
        this.searchBlob = searchBlob;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }

        final Player that = (Player) o;

        return Objects.equals(this.number, that.number) &&
                Objects.equals(this.name, that.name) &&
                Objects.equals(this.position, that.position) &&
                Objects.equals(this.nationality, that.nationality) &&
                Objects.equals(this.birthPlace, that.birthPlace) &&
                Objects.equals(this.height, that.height) &&
                Objects.equals(this.weight, that.weight) &&
                Objects.equals(this.dob, that.dob);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number, name, position, nationality, birthPlace, height, weight, dob);
    }

    public static String escape(String str) {
        return str.replace(delimiter, delimiter + delimiter);
    }
}
