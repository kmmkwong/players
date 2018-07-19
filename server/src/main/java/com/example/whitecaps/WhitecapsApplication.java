package com.example.whitecaps;

import com.example.whitecaps.core.Player;
import com.example.whitecaps.core.Template;
import com.example.whitecaps.db.PlayerDAO;
import com.example.whitecaps.resources.HelloWorldResource;
import com.example.whitecaps.resources.PlayersResource;
import io.dropwizard.Application;
// import io.dropwizard.assets.AssetsBundle;
// import io.dropwizard.auth.AuthDynamicFeature;
// import io.dropwizard.auth.AuthValueFactoryProvider;
// import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
// import io.dropwizard.views.ViewBundle;
// import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
// import java.util.Map;

public class WhitecapsApplication extends Application<WhitecapsConfiguration> {
    public static void main(String[] args) throws Exception {
        new WhitecapsApplication().run(args);
    }

    private final HibernateBundle<WhitecapsConfiguration> hibernateBundle =
        new HibernateBundle<WhitecapsConfiguration>(Player.class) {
            @Override
            public DataSourceFactory getDataSourceFactory(WhitecapsConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        };

    @Override
    public String getName() {
        return "hello-world";
    }

    @Override
    public void initialize(Bootstrap<WhitecapsConfiguration> bootstrap) {
        // Enable variable substitution with environment variables
        bootstrap.setConfigurationSourceProvider(
                new SubstitutingSourceProvider(
                        bootstrap.getConfigurationSourceProvider(),
                        new EnvironmentVariableSubstitutor(false)
                )
        );

        bootstrap.addBundle(new MigrationsBundle<WhitecapsConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(WhitecapsConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
        bootstrap.addBundle(hibernateBundle);
    }

    @Override
    public void run(WhitecapsConfiguration configuration, Environment environment) {
        final PlayerDAO dao = new PlayerDAO(hibernateBundle.getSessionFactory());
        final Template template = configuration.buildTemplate();
                 
        environment.jersey().register(new HelloWorldResource(template));
        environment.jersey().register(new CorsFilter()); 
        environment.jersey().register(new PlayersResource(dao));
    }
}
