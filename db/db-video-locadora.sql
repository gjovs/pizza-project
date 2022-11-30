USE db_video_locadora;

SELECT  tbl_filme.nome as nomeFilme, tbl_filme.sinopse, 
		tbl_genero.nome as nomeGenero, 
		tbl_classificacao.nome as nomeClassificacao, tbl_classificacao.classificacao, tbl_classificacao.caracteristica,
        tbl_ator_diretor.nome as nomeAtor, tbl_ator_diretor.nome_artistico, tbl_nacionalidade.nome as nomeNacionalidadeAtor
        FROM tbl_filme
        INNER JOIN tbl_filme_genero on tbl_filme_genero.id_filme =  tbl_filme.id        
        INNER JOIN tbl_genero on tbl_genero.id = tbl_filme_genero.id_genero
        INNER JOIN tbl_classificacao on tbl_classificacao.id = tbl_filme_classficacao.id_classificacao
        INNER JOIN tbl_filme_ator on tbl_filme_ator.id_filme = tbl_filme.id
        INNER JOIN tbl_ator on tbl_ator.id = tbl_filme_ator.id_ator
        INNER JOIN tbl_ator_diretor on tbl_ator_diretor.id = tbl_ator.id_ator_diretor
		INNER JOIN tbl_ator_diretor_nacionalidade on tbl_ator_diretor_nacionalidade.id_ator_diretor = tbl_ator_diretor.id
        INNER JOIN tbl_nacionalidade on tbl_nacionalidade.id = tbl_ator_diretor_nacionalidade.id_nacionalidade
        WHERE tbl_filme.id = 1;
