package com.example.whitecaps.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.MoreObjects;
import java.util.List;
import com.example.whitecaps.core.Player;

public class Players {
    private long id;
    private List<Player> players;


    public Players() {
        // Jackson deserialization
    }

    public Players(long id, List<Player> players) {
        this.id = id;
        this.players = players;
    }

    @JsonProperty
    public long getId() {
        return id;
    }

    @JsonProperty
    public List<Player> getPlayers() {
        return players;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("id", id)
                .add("players", players)
                .toString();
    }
}
