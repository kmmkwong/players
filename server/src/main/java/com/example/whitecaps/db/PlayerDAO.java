package com.example.whitecaps.db;

import com.example.whitecaps.core.Player;
import io.dropwizard.hibernate.AbstractDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.SessionFactory;
import java.util.List;
import java.util.Optional;


public class PlayerDAO extends AbstractDAO<Player> {

    private static final Logger LOGGER = LoggerFactory.getLogger(PlayerDAO.class);

    public PlayerDAO(SessionFactory factory) {
        super(factory);
    }

    public Optional<Player> findById(Long id) {
        return Optional.ofNullable(get(id));
    }

    public Player create(Player player) {
        return persist(player);
    }

    public List<Player> findAll() {
        return list(namedQuery("com.example.whitecaps.core.Player.findAll"));
    }

    public List<Player> search(String term) {
        // TODO: search term might need to be escaped further; does not consistently handle special characters right now
        String processedTerm = Player.escape(term);
        LOGGER.info("Searching for: " + processedTerm); 
        return list(namedQuery("com.example.whitecaps.core.Player.search").setParameter("term", processedTerm));

    }
}
