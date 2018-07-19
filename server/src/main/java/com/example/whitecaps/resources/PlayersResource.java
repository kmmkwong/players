package com.example.whitecaps.resources;

import com.codahale.metrics.annotation.Timed;
import com.example.whitecaps.api.*;
import com.example.whitecaps.db.PlayerDAO;

import io.dropwizard.jersey.caching.CacheControl;
import io.dropwizard.hibernate.UnitOfWork;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
public class PlayersResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlayersResource.class);

    private final PlayerDAO playerDAO;
    private final AtomicLong counter;

    public PlayersResource(PlayerDAO playerDAO) {
        this.playerDAO = playerDAO; 
        this.counter = new AtomicLong();
    }

    @GET
    @Timed(name = "get-requests")
    @UnitOfWork
    @CacheControl(maxAge = 1, maxAgeUnit = TimeUnit.DAYS)
    public Players getPlayers(@QueryParam("search") Optional<String> term) {
        if (term.isPresent()) {
            return new Players(counter.incrementAndGet(), playerDAO.search(term.get()));
        } else {
            return new Players(counter.incrementAndGet(), playerDAO.findAll());
        }
    }
}
